import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '/modules/components/Typography';
import AppFooter from '/modules/views/AppFooter';
import AppAppBar from '/modules/views/AppAppBar';
import AppForm from '/modules/views/AppForm';
import { email, required } from '/modules/form/validation';
import RFTextField from '/modules/form/RFTextField';
import FormButton from '/modules/form/FormButton';
import FormFeedback from '/modules/form/FormFeedback';
import withRoot from '/modules/withRoot';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

const steps = [
  'Llena los datos del evento',
  'Selecciona una categoria',
  'Registra tus datos',
];

function HorizontalLabelPositionBelowStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={3} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

function SignUp() {
    const [sent, setSent] = React.useState(false);
    const [how_many_people, setHowManyPeople] = React.useState('');
    const [type_event, setTypeEvent] = React.useState('');
    const [total_budget, setTotalBudget] = React.useState('');
    const [isPrivate, setIsPrivate] = React.useState('');

    const handleChange = (event) => {
      setHowManyPeople(event.target.value);
    };
    const handleChangeTypeEvent = (event) => {
      setTypeEvent(event.target.value);
    };
    const handleChangeTotalBudget = (event) => {
      setTotalBudget(event.target.value);
    };
    const handleChangeIsPrivate = (event) => {
      setIsPrivate(event.target.value);
    };

    const validate = (values) => {
      const errors = required(['how_many_people', 'type_event', 'zip_code', 'isPrivate','total_budget', 'email', 'password'], values);
    };

    const handleSubmit = () => {
      setSent(true);
    };

    return (
      <React.Fragment>
        <AppAppBar />
        <HorizontalLabelPositionBelowStepper />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Platicanos mas sobre tu evento
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
                <Grid item xs={12} sm={12}>
                 <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">¿Cual es el tipo de evento?</InputLabel>
                       <Select
                        disabled={submitting || sent}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type_event}
                        label="¿Cual es el tipo de evento?"
                        onChange={handleChangeTypeEvent}
                        required
                      >
                        <MenuItem value={"Eventos Sociales"}>Eventos Sociales</MenuItem>
                        <MenuItem value={"Convenciones"}>Convenciones</MenuItem>
                        <MenuItem value={"Espectáculos"}>Espectáculos</MenuItem>
                        <MenuItem value={"Eventos para recaudar fondos"}>Eventos para recaudar fondos</MenuItem>
                        <MenuItem value={"Eventos corporativos"}>Eventos corporativos</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <FormControl fullWidth>
                   <InputLabel id="demo-simple-select-label">¿Para cuantas personas es el evento?</InputLabel>
                    <Select
                      disabled={submitting || sent}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={how_many_people}
                      label="¿Para cuantas personas es el evento?"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value={10}>0 - 10</MenuItem>
                      <MenuItem value={20}>10 - 20</MenuItem>
                      <MenuItem value={50}>20 - 50</MenuItem>
                      <MenuItem value={100}>50 - 100</MenuItem>
                      <MenuItem value={200}>100 - 200</MenuItem>
                      <MenuItem value={201}>200 - +200</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete=""
                    fullWidth
                    label="Codigo Postal"
                    name="zip_code"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Privado o Publico</InputLabel>
                       <Select
                         disabled={submitting || sent}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={isPrivate}
                          label="Privado o Publico"
                          onChange={handleChangeIsPrivate}
                          required
                        >
                          <MenuItem value={true}>Privado</MenuItem>
                          <MenuItem value={false}>Publico</MenuItem>
                        </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">¿Presupuesto Total?</InputLabel>
                       <Select
                         disabled={submitting || sent}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={total_budget}
                          label="¿Presupuesto Total?"
                          onChange={handleChangeTotalBudget}
                          required
                        >
                          <MenuItem value={10000}>$0 - $10,000</MenuItem>
                          <MenuItem value={20000}>$10,001- $20,000</MenuItem>
                          <MenuItem value={50000}>$20,001 - $50,000</MenuItem>
                          <MenuItem value={51000}>$50,001 - +$50,001</MenuItem>
                        </Select>
                  </FormControl>
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
                {submitting || sent ? ' En progreso... ' : 'Siguiente Paso'}
              </FormButton>
            </Box>
          )}
        </Form>
        </AppForm>
        Footer
      </React.Fragment>
    );
  }

  export default withRoot(SignUp);
