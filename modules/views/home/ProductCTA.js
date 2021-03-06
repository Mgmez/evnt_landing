import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '/modules/components/Typography';
import TextField from '/modules/components/TextField';
import Snackbar from '/modules/components/Snackbar';
import Button from '/modules/components/Button';
import { fontFamily } from '@mui/system';

function ProductCTA() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: 'flex' }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              bgcolor: '#0110b3',
              py: 8,
              px: 3,
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography style={{color: "#FFFFFF", fontFamily: "times roman"}} variant="h2" component="h2" gutterBottom>
                Registrate como proveedor
              </Typography>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                href="/SignUpProvider"
                sx={{ width: '100%' }}
              >
                Quiero ser proveedor
              </Button>
              <Typography style={{color: "#FFFFFF", fontFamily: "times roman"}} variant="h5">
                Promociona tus Servicios.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: 'block', xs: 'none' }, position: 'relative' }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: '100%',
              background: 'url(https://mui.com/static/themes/onepirate/productCTAImageDots.png)',
            }}
          />
          <Box
            component="img"
            src="https://mott.pe/noticias/wp-content/uploads/2018/09/antes-de-realizar-las-fotografias-de-eventos-debes-visitar-el-lugar.png"
            alt="call to action"
            sx={{
              position: 'absolute',
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="We will send you our best offers, once a week."
      />
    </Container>
  );
}

export default ProductCTA;
