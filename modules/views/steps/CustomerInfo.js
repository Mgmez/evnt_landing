import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '/modules/components/Typography';
import AppForm from '/modules/views/home/AppForm';
import { email, required } from '/modules/form/validation';
import RFTextField from '/modules/form/RFTextField';
import FormButton from '/modules/form/FormButton';
import FormFeedback from '/modules/form/FormFeedback';
import withRoot from '/modules/withRoot';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import frLocale from 'date-fns/locale/fr';

const localeMap = {
  fr: frLocale,
};

const maskMap = {
  fr: '__/__/____',
};

function CustomerInfo() {
  const [sent, setSent] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [locale, setLocale] = React.useState('fr');

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Ingresa tu información
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <Field
                    autoComplete="firstName"
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Nombre(s)"
                    margin="normal"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoComplete="lastName"
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    label="Apellidos"
                    margin="normal"
                    name="lastName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                </Grid>
                <Grid item xs={12} sm={6} style={{ align: "center" }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]} >
                    <div>
                      <DatePicker
                        label="Fecha de Nacimiento"
                        mask={maskMap[locale]}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                </Grid>
              </Grid>

              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? ' En progreso... ' : 'Registrarme'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(CustomerInfo);
