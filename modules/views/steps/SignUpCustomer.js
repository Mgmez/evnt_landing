import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Form, FormSpy } from 'react-final-form';
import Typography from '/modules/components/Typography';
import AppForm from '/modules/views/home/AppForm';
import { email, required } from '/modules/form/validation';
import FormButton from '/modules/form/FormButton';
import FormFeedback from '/modules/form/FormFeedback';
import withRoot from '/modules/withRoot';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import frLocale from 'date-fns/locale/es';

const localeMap = {
  fr: frLocale,
};

const maskMap = {
  fr: '__/__/____',
};


function SignUpCustomer({ form, hasAccount, handleChangeUserData, toggleHasAccount,handleChangeBD, handleSubmitData }) {
  const [sent, setSent] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [locale, setLocale] = React.useState('fr');

  const validate = (values) => {
    const errors = required(['email', 'password', 'password2'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };


 

 
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Ingresa tus datos de cliente
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmitData}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form"  onSubmit={handleSubmitData} noValidate={false} sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <ToggleButtonGroup
                    color="primary"
                    value={hasAccount}
                    exclusive
                    onChange={toggleHasAccount}
                  >
                    <ToggleButton value={false}>Nueva Cuenta</ToggleButton>
                    <ToggleButton value={true}>Ya tengo cuenta</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} sm={2}>
                </Grid>
                <TextField
                  value={form.email}
                  autoComplete="email"
                  disabled={submitting || sent}
                  fullWidth
                  label="Correo Electronico"
                  margin="normal"
                  name="email"
                  required
                  onChange={handleChangeUserData}
                />
                <TextField
                  value={form.password}
                  fullWidth
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="new-password"
                  label="Contraseña"
                  type="password"
                  margin="normal"
                  onChange={handleChangeUserData}
                />
                {
                  !hasAccount &&
                  <>
                    <TextField
                      value={form.password2}
                      fullWidth
                      disabled={submitting || sent}
                      required
                      name="password2"
                      autoComplete="new-password"
                      label="Confirme Contraseña"
                      type="password"
                      margin="normal"
                      onChange={handleChangeUserData}
                    />
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="firstName"
                        disabled={submitting || sent}
                        fullWidth
                        label="Nombre(s)"
                        margin="normal"
                        name="firstName"
                        required
                        onChange={handleChangeUserData}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="lastName"
                        disabled={submitting || sent}
                        fullWidth
                        label="Apellidos"
                        margin="normal"
                        name="lastName"
                        required
                        onChange={handleChangeUserData}
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ align: "center" }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]} >
                        <div>
                          <DatePicker
                            disableFuture
                            name="birthdayDate"
                            label="Fecha de Nacimiento"
                            mask={maskMap[locale]}
                            value={form.birthdayDate}
                            onChange={(value)=>handleChangeBD(value)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                    </Grid>
                  </>}

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
                {submitting || sent ? ' En progreso... ' : 'Comenzar'}
              </FormButton>
              
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment >
  );
}

export default withRoot(SignUpCustomer);
