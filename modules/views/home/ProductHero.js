import * as React from 'react';
import { useState } from 'react';
import Button from '/modules/components/Button';
import Typography from '/modules/components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import frLocale from 'date-fns/locale/fr';
import Link from 'next/link'


const localeMap = {
  fr: frLocale,
};

const maskMap = {
  fr: '__/__/____',
};



const backgroundImage =
  'https://www.protocoloimep.com/app/uploads/2016/11/evento-sostenible.png';

  

export default function ProductHero() {
  const [date, setDate] = useState(Date.now());
  const [locale, setLocale] = React.useState('es');


  const formatDate = () => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  }

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Nosotros te guiamos para que tengas el mejor evento
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Deja esto en nuestras manos.
      </Typography>
      <Typography  style={{backgroundColor: "#FFFFFF", marginBottom: "15px"}} variant="body2" align="center">
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
      <div>
        <DatePicker
        disablePast
        label="Fecha del evento"
          mask={maskMap[locale]}
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
      </Typography>
      <Link href={`/Steps?date=${date}`}>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          

          sx={{ minWidth: 200 }}
        >
          Inicia tu evento
        </Button>
      </Link>
      


      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Disfruta de la experiencia
      </Typography>
    </ProductHeroLayout>
  );
}
