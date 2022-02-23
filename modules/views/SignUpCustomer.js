import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '/modules/components/Typography';
import AppForm from '/modules/views/AppForm';
import { email, required } from '/modules/form/validation';
import RFTextField from '/modules/form/RFTextField';
import FormButton from '/modules/form/FormButton';
import FormFeedback from '/modules/form/FormFeedback';
import withRoot from '/modules/withRoot';

function SignUpCustomer() {
  const [sent, setSent] = React.useState(false);

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

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Ingresa tus datos de usuario
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  Rol siempre de cliente
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Correo Electronico"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Contraseña"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password2"
                autoComplete="new-password"
                label="Confirme Contraseña"
                type="password2"
                margin="normal"
              />
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
                {submitting || sent ? ' En progreso... ' : 'Siguiente'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUpCustomer);
