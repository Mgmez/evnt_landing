import * as React from 'react';
import { useState } from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { Input } from '@mui/material';

const backgroundImage =
  'https://www.protocoloimep.com/app/uploads/2016/11/evento-sostenible.png';

export default function ProductHero() {
  const [date, setDate] = useState(Date.now());

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
      <Typography variant="body2" align="center">
      <Input 
      style={{backgroundColor: "#FFFFFF", marginBottom: "15px"}}
      type = "date" 
      value={date} 
      onChange={(event)=>setDate(event.target.value)} 
      />
          </Typography>
          
          <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href='Steps'
       
        sx={{ minWidth: 200 }}
      >
        Inicia tu evento
      </Button>
          
    
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Disfruta de la experiencia
      </Typography>
    </ProductHeroLayout>
  );
}
