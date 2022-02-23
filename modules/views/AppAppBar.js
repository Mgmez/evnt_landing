import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: "#ff4f6e" }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, justifyContent: 'flex-start' }} >
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 24 }}
            >
              <img
                src='https://app.evnt.com.mx/img/logo_png_01.822386fa.svg'
                width={90}
              />
            </Link>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="https://app.evnt.com.mx"
              sx={{ ...rightLink}}
            >
              {'Catalogo'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="https://app.evnt.com.mx/auth-register-v1"
              sx={{ ...rightLink, color: '#111111' }}
            >
              {'Registrarse'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="https://app.evnt.com.mx/login"
              sx={rightLink}
            >
              {'Iniciar Sesión'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
