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
import SignUp from '/modules//views/SignUpCustomer';

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
    zip_code: '',
    categories: [],
    
  });
  const [eventID, setEventID] = useState()

  const handleChange = event =>{
  
    const form = JSON.parse(JSON.stringify(eventForm))
    if(event.target.name === 'zip_code'){
      if(isNaN(event.target.value)){
         return  
      }
    }
    form[event.target.name] = event.target.value;
    setEventForm(form)

  }
  const handleChangeCbx = event =>{
    const form = JSON.parse(JSON.stringify(eventForm))
    
    if(event.target.checked){
      form.categories.push(event.target.name)
    }else{
      const ind = form.categories.indexOf(event.target.name)
      if(ind !== -1){
        form.categories.splice(ind,1)
      }
      
    }
    setEventForm(form);

  }

  const submitEvent= async()=>{
    const ruta = 'https://api.evnt.com.mx/event';
   
      const dataJSON = JSON.stringify(eventForm)
      const response= await axios.post(ruta, dataJson)
      if(response.status===200){
          ///response
          setEventID(response.data.event)
          setStep(page+1)
      }else{
        
      }
    
  }
  const submitEventResource= async()=>{
    const ruta = 'https://api.evnt.com.mx/event-resource';
    categories.forEach(async(category)=>{
      const dataEventRespurse = {
        event : eventID,
        subCategory: category,
        description: ''
      };
      const dataJSON = JSON.stringify(dataEventRespurse)
      const response = await axios.post(ruta, dataJson)
      if(response.status===200){

      }else{
        
      }
    })
    //axios post event
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
       <Categories form = {eventForm} handleNextStep={()=>setStep(step+1)} handleSubmit={submitEvent} handleChangeCbx={handleChangeCbx}/>
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
