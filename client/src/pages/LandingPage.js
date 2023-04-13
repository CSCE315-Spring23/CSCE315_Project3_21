import { Button, TextField, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const CFAstyle = {
  backgroundColor : "#b22222",
  color : "white",
  padding : "10px"
}

const theme = createTheme({
  palette: {
    primary: {
      main : '#b22222',
    }
  }
})

export default function LandingPage() {
    return (
      <ThemeProvider theme={theme}>
      <div id="landing-page">
        <h1
          style = {CFAstyle}
          >Howdy! Welcome to Chick-Fil-A's POS System</h1>
        <div>
          <Button variant="contained" color="primary" component={Link} to="/LoginPage">Click Here to Log In</Button>
        </div>
      </div>
      </ThemeProvider>
    );
  }