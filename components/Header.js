import { Button } from '@mui/material'
import React from 'react'
import styles from '../styles/Header.module.css'


const Header = () => {

  return (
    <div className={styles.header}>
        <div className={styles.logo}>
            <img width={'98'} height={'54'}  src='https://evnt.com.mx/img/logo_png_01.822386fa.svg'/>
        </div>
        <div className={styles.menu}>
        <Button variant="outlined" href='https://evnt.com.mx' target="_blank"  sx={{ my: 2, color: 'white', display: 'block' }}>Catalogo</Button>
        <Button variant="outlined" href='https://evnt.com.mx/login' target="_blank"  sx={{ my: 2, color: 'white', display: 'block' }}>Sign In</Button>
        <Button variant="outlined" href='https://evnt.com.mx/auth-register-v1' target={'blank'} sx={{ my: 2, color: 'white', display: 'block' }}>Sign Up</Button>
        </div>

    </div>
  )
}
export default Header
