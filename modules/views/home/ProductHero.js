import * as React from 'react';
import { useState } from 'react';
import Button from '/modules/components/Button';
import Typography from '/modules/components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import frLocale from 'date-fns/locale/es';
import Link from 'next/link'
import { styled } from '@mui/material/styles';
import styles from '/styles/ProductHero.module.css';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';





const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '15px 30px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#fe607f',
  borderColor: '#fe4f6f',
  borderRadius: '50px',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#fe607f',
    borderColor: '#fe94a9',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#ff5071',
    borderColor: '#ff718c',
  },
  '&:focus': {
    boxShadow: '#ff5071',
  },
});

const localeMap = {
  fr: frLocale,
};

const maskMap = {
  fr: '__/__/____',
};



const backgroundImage =
  'https://cdn.shopify.com/s/files/1/0272/5199/8797/t/13/assets/pf-354361f8--Eventos.jpg?v=1606964038';



export default function ProductHero() {
  const [date, setDate] = useState(null);
  const [locale, setLocale] = React.useState('fr');
  const router = useRouter();

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    if (!date) {
      setState({ open: true, ...newState });
    } else {
      router.push(`/Steps?date=${date}`)
    }
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };



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
        SELECCIONA LA FECHA DEL EVENTO:
      </Typography>
      <Typography style={{marginBottom: "15px" }}>

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
          <DatePicker
            disablePast
            format="dd/MM/yyyy"
            mask={maskMap[locale]}
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField className={styles.datepicker} {...params} />}
          />
        </LocalizationProvider>
      </Typography>




      <BootstrapButton variant="contained" disableRipple onClick={handleClick({
          vertical: 'top',
          horizontal: 'center',
        })}>
        INICIA TU EVENTO

        <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal} 
        autoHideDuration={500} 
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Selecciona una fecha
        </Alert>
      </Snackbar>
      </BootstrapButton>





      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Disfruta de la experiencia
      </Typography>
    </ProductHeroLayout>
  );
}
