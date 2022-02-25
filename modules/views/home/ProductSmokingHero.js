import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '/modules/components/Typography';

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span">
          ¿Tienes alguna duda?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        ¡Toca el boton y contactanos!
      </Typography>
      <Box
        component="img"
        src="https://mui.com/static/themes/onepirate/poducBuoy.svg"
        alt=""
        sx={{ width: 60 }}
      />
    </Container>
  );
}

export default ProductSmokingHero;
