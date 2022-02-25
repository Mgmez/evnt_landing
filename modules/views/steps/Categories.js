import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '/modules/components/Typography';
import AppForm from '/modules/views/home/AppForm';
import { required } from '/modules/form/validation';
import FormButton from '/modules/form/FormButton';
import FormFeedback from '/modules/form/FormFeedback';
import withRoot from '/modules/withRoot';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';



function Categories({ form, handleNextStep, handleSubmit, handleChangeCbx }) {
  const [sent, setSent] = useState(false);
  const [categories, setCategories] = useState([]);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);
  };

  const getCategories = async () => {
    const routeBase = "https://api.evnt.com.mx/"
    const route = "sub-category?page=1&limit=10&q"

    const response = await axios(routeBase + route)
    if (response?.status === 200) {
      console.log(response.data)
      setCategories(response.data?.items || [])
    } else {
      console.log(response)
    }

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
            <Box component="form" onSubmit={handleNextStep} noValidate={false} sx={{ mt: 6 }}>

              <Grid container spacing={2}>
                {
                  categories?.map(category => (
                    <Grid item xs={12} sm={4} key={category.id}>
                      <FormGroup
                      >
                        <FormControlLabel
                          control={
                            <Checkbox checked={form?.categories?.includes(category.id)} onChange={handleChangeCbx} name={category?.id} />
                          }
                          label={category?.name}
                        />
                      </FormGroup>
                    </Grid>
                  ))
                }

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
