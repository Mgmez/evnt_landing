import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '/modules/components/Typography';
import AppForm from '/modules/views/home/AppForm';
import { email, required } from '/modules/form/validation';
import FormButton from '/modules/form/FormButton';
import FormFeedback from '/modules/form/FormFeedback';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';



function EventForm({ onChange, handleNextStep, form }) {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['how_many_people', 'name', 'type_event', 'zip_code', 'isPrivate', 'total_budget', 'email', 'password'], values);
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Platicanos mas sobre tu evento
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleNextStep}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleNextStep} noValidate={false} sx={{ mt: 6 }}>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Nombre del evento"
                    id="name"
                    size="normal"
                    disabled={submitting || sent}
                    name="name"
                    value={form.name}
                    required
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="type_event">¿Cual es el tipo de evento?</InputLabel>
                    <Select
                      name='type_event'
                      disabled={submitting || sent}
                      labelId="type_event"
                      id="type_event"
                      value={form.type_event}
                      label="¿Cual es el tipo de evento?"
                      onChange={onChange}
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
                    <InputLabel id="how_many_people">¿Para cuantas personas es el evento?</InputLabel>
                    <Select
                      name='how_many_people'
                      disabled={submitting || sent}
                      labelId="how_many_people"
                      id="how_many_people"
                      value={form.how_many_people}
                      label="¿Para cuantas personas es el evento?"
                      onChange={onChange}
                      required
                    >
                      <MenuItem value={"0 - 10"}>0 - 10</MenuItem>
                      <MenuItem value={"10 - 20"}>10 - 20</MenuItem>
                      <MenuItem value={"20 - 50"}>20 - 50</MenuItem>
                      <MenuItem value={"50 - 100"}>50 - 100</MenuItem>
                      <MenuItem value={"100 - 200"}>100 - 200</MenuItem>
                      <MenuItem value={"200 - +200"}>200 - +200</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Codigo Postal"
                    id="zip_code"
                    size="normal"
                    disabled={submitting || sent}
                    name="zip_code"
                    value={form.zip_code}
                    required
                    onChange={onChange}
                    inputProps={{ inputMode: 'numeric', maxLength: 5, pattern: '[0-9]*' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Privado o Publico</InputLabel>
                    <Select

                      name='isPrivate'
                      disabled={submitting || sent}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form.isPrivate}
                      label="Privado o Publico"
                      required
                      onChange={onChange}
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
                      name='total_budget'
                      disabled={submitting || sent}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={form.total_budget}
                      label="¿Presupuesto Total?"
                      onChange={onChange}
                      required
                    >
                      <MenuItem value={"$0 - $10,000"}>$0 - $10,000</MenuItem>
                      <MenuItem value={"$10,001- $20,000"}>$10,001- $20,000</MenuItem>
                      <MenuItem value={"$20,001 - $50,000"}>$20,001 - $50,000</MenuItem>
                      <MenuItem value={"$50,001 - +$50,001"}>$50,001 - +$50,001</MenuItem>
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
    </React.Fragment>
  );
}

export default EventForm