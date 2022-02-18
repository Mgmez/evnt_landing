import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '/modules/components/Typography';
import AppFooter from '/modules/views/AppFooter';
import AppAppBar from '/modules/views/AppAppBar';
import AppForm from '/modules/views/AppForm';
import { email, required } from '/modules/form/validation';
import FormButton from '/modules/form/FormButton';
import FormFeedback from '/modules/form/FormFeedback';
import withRoot from '/modules/withRoot';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';



function Categories({form, handleNextStep, handleSubmit}){
  const [sent, setSent] = React.useState(false);
  const [categories, setCategories] = React.useState([]);

  const validate = (values) => {
    const errors = required(['how_many_people', 'type_event', 'zip_code', 'isPrivate', 'total_budget', 'email', 'password'], values);
  };

  const getCategories= async()=>{
    const routeBase = "https://api.evnt.com.mx/"
    const route = "sub-category?page=1&limit=10&q"    

    const response = await fetch(routeBase+route)
    const data = response.json()



    console.log(data)
    setCategories(data.items)
  }


  useEffect(() => {
    getCategories();  
  }, [])
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Selecciona las categorias para tu evento
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleNextStep}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleNextStep} noValidate={true} sx={{ mt: 6 }}>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    {
                      categories?.slice(0,5).map(category=>{
                        <FormControlLabel control={<Checkbox />} label={category.name} />
                      })
                    }
                  <FormControlLabel control={<Checkbox />} label="Comida" />
                  <FormControlLabel control={<Checkbox />} label="Musica" />
                  <FormControlLabel control={<Checkbox />} label="Salones de Eventos" />
                   
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    {
                      categories?.slice(5,10).map(category=>{
                        <FormControlLabel control={<Checkbox />} label={category.name} />
                      })
                    }
                    <FormControlLabel control={<Checkbox />} label="Mobiliario" />
                    <FormControlLabel control={<Checkbox />} label="Fotografia"/>
                    <FormControlLabel control={<Checkbox />} label="Hostes" />
                  </FormGroup>
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

export default withRoot(Categories);
