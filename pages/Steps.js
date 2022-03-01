import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AppFooter from '/modules/views/home/AppFooter';
import AppAppBar from '/modules/views/home/AppAppBar';
import withRoot from '/modules/withRoot';
import Categories from '/modules/views/steps/Categories';
import EventForm from '/modules/views/steps/EventForm'
import SignUpCustomer from '/modules/views/steps/SignUpCustomer';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const steps = [
  'Llena los datos del evento',
  'Selecciona una categoria',
  'Registra tus datos'
];


function HorizontalLabelPositionBelowStepper({ step }) {
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
    name: '',
    how_many_people: '',
    type_event: '',
    total_budget: '',
    isPrivate: '',
    zip_code: '',
    categories: [],
    date: '20222-02-22'

  });
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
    birthdayDate: '',
  });
  const [hasAccount, setHasAccount] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = event => {

    const form = JSON.parse(JSON.stringify(eventForm))
    if (event.target.name === 'zip_code') {
      if (isNaN(event.target.value)) {
        return
      }
    }
    form[event.target.name] = event.target.value;
    setEventForm(form)

  }

  const handleChangeUserData = event => {
    const formUser = JSON.parse(JSON.stringify(userData))

    formUser[event.target.name] = event.target.value;
    setUserData(formUser)

  }
  const handleChangeBD = value => {
    console.log(value)
    const formUser = JSON.parse(JSON.stringify(userData))
    formUser.birthdayDate = value
    setUserData(formUser)

  }
  const handleChangeCbx = event => {
    const form = JSON.parse(JSON.stringify(eventForm))

    if (event.target.checked) {
      form.categories.push(event.target.name)
    } else {
      const ind = form.categories.indexOf(event.target.name)
      if (ind !== -1) {
        form.categories.splice(ind, 1)
      }

    }
    setEventForm(form);

  }

  const submitEvent = async () => {
    const ruta = 'https://api.evnt.com.mx/event';

    const dataJSON = JSON.stringify(eventForm)
    const response = await axios.post(ruta, dataJson)
    if (response.status === 200) {
      ///response
      setEventID(response.data.event)
      setStep(page + 1)
    } else {

    }

  }
  const submitEventResource = async () => {
    const ruta = 'https://api.evnt.com.mx/event-resource';
    categories.forEach(async (category) => {
      const dataEventRespurse = {
        event: eventID,
        subCategory: category,
        description: ''
      };
      const dataJSON = JSON.stringify(dataEventRespurse)
      const response = await axios.post(ruta, dataJson)
      if (response.status === 200) {

      } else {

      }
    })
    //axios post event
  }
  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const rutaUser = 'https://api.evnt.com.mx/user';
    const rutaCustomer = 'https://api.evnt.com.mx/customer';
    const rutaEvent = 'https://api.evnt.com.mx/event';
    const rutaEventResource = 'https://api.evnt.com.mx/event-resource';
    const rutaLogin = 'https://api.evnt.com.mx/auth/login';
    //userData.birthdayDate = `${new Date(userData.birthdayDate).getFullYear()}-${new Date(userData.birthdayDate).getMonth()}-${new Date(userData.birthdayDate).getDay()}`

    const dataUser = {
      ...userData,
      role: 'a7c9902f-7c59-4190-be3e-c3b5219652f3',
      plan: 'free',
    };

    const response = await axios.post(rutaUser, dataUser)

    if (response.status === 201) {

      const idUser = await response.data.id
      const dataCustomer = {
        ...dataUser,
        user: idUser,
      }
      const responsePostCustomer = await axios.post(rutaCustomer, dataCustomer)

      if (responsePostCustomer.status === 201) {

        const idCustomer = await responsePostCustomer.data.id
        const dataeventForm = {
          ...eventForm,
          customer: idCustomer,
          date: '2022-02-15T05:18:55.118Z',
          description: 'descripcion',
        }
        const responsePostEvent = await axios.post(rutaEvent, dataeventForm)

        if (responsePostEvent.status === 201) {

          const eventID = await responsePostEvent.data.id
          eventForm.categories.forEach(async (category) => {

            const dataEventResourse = {
              event: eventID,
              subCategory: category,
              description: ''
            };
            const responseEveRes = await axios.post(rutaEventResource, dataEventResourse)
            if (responseEveRes.status === 201) {


            } else {

            }
          })
          const responselogin = await axios.post(rutaLogin, dataUser)
          const tokenLogin = await responselogin.data.access_token
          window.location.href = [`https://app.evnt.com.mx/my-events?login=${tokenLogin}`]
        }

      }
    } else {

    }


    setLoading(false)
  }


  return (
    <>
      <AppAppBar />
      <HorizontalLabelPositionBelowStepper step={step} style={{ marginBottom: "15px" }} />
      {
        step == 1 &&
        <EventForm form={eventForm} onChange={handleChange} handleNextStep={() => setStep(step + 1)} />
      }
      {
        step == 2 &&
        <Categories form={eventForm} handleNextStep={() => setStep(step + 1)} handleSubmit={submitEvent} handleChangeCbx={handleChangeCbx} />
      }
      {
        step == 3 &&
        <SignUpCustomer
          form={userData}
          handleSubmitData={submit}
          handleChangeUserData={handleChangeUserData}
          toggleHasAccount={() => setHasAccount(!hasAccount)}
          hasAccount={hasAccount}
          handleChangeBD={handleChangeBD}
          setLoading={setLoading}
        />
      }
      {
        loading &&
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>}
      <AppFooter />
    </>
  )
}


export default withRoot(Steps);
