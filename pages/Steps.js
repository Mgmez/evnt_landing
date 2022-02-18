import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AppFooter from '/modules/views/AppFooter';
import AppAppBar from '/modules/views/AppAppBar';
import withRoot from '/modules/withRoot';
import Categories from '/modules/views/Categories';
import EventForm from '/modules/views/EventForm'
import SignUp from '/modules//views/SignUp';

const steps = [
  'Llena los datos del evento',
  'Selecciona una categoria',
  'Registra tus datos',
];


function HorizontalLabelPositionBelowStepper({step}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}


function Steps() {
  const [step, setStep] = useState(1);
  const [eventForm, setEventForm] = useState({
    how_many_people: '',
    type_event: '',
    total_budget: '',
    isPrivate: '',
    categories: [],
  });
  const handleChange = event =>{
  
    const form = JSON.parse(JSON.stringify(eventForm))
    form[event.target.name] = event.target.value;
    setEventForm(form)

  }

  const submitEvent=()=>{

  }
  const onSubmit=()=>{

  }
  
  return(
    <>
      <AppAppBar />
      <HorizontalLabelPositionBelowStepper step= {step} />
      {
       step == 1 &&
       <EventForm form = {eventForm} onChange = {handleChange} handleNextStep={()=>setStep(step+1)}/>
      }
      {
       step == 2 &&
       <Categories form = {eventForm} handleNextStep={()=>setStep(step+1)} handleSubmit={submitEvent}/>
      }
      {
       step == 3 &&
       <SignUp form = {eventForm} handleSubmit={onSubmit}/>
      }
     <AppFooter/> 
    </>
  )
}


  export default withRoot(Steps);
