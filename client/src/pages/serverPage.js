import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import MenuItemTable from '../components/MenuItemTable.js';
import { Button, Menu, MenuItem, ThemeProvider, createTheme } from '@mui/material';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

// For the button icons
document.querySelectorAll('lord-icon').forEach((element) => {
  element.addEventListener('ready', () => {
    element.classList.add('ready');
  });
});
defineElement(lottie.loadAnimation);

const theme = createTheme({
  palette: {
    primary: {
      main : '#E51636',
    }
  }
})

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// The grid max xs = 12
function serverPage() {
  return (
    <ThemeProvider theme={theme}>
    <div className="serverPage">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <MainAppBar>
            
          </MainAppBar>
        </Grid>
        <Grid xs = {12} >
        {/* <Button 
        variant = "outlined" 
        style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}
        
        >
          <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
          <lord-icon
              src="https://cdn.lordicon.com/xnfkhcfn.json"
              trigger="hover"
              colors="primary:#c71f16,secondary:#121331"
              style={{width:'75px' ,height:'75px'}}>
          </lord-icon>
          <p>
          Entrees
          </p>

        </Button>
        <Button variant = "outlined" style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}>
          <div align = "center">
            <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
            <lord-icon
                src="https://cdn.lordicon.com/fkytfmrm.json"
                trigger="hover"
                colors="primary:#121331,secondary:#c71f16"
                style={{width:'75px',height:'75px'}}>
            </lord-icon>
            <p>
            Sides
            </p>
          </div>
        </Button>
        <Button variant = "outlined" style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}>
          <div align = "center">
          <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
          <lord-icon
              src="https://cdn.lordicon.com/elzyzcar.json"
              trigger="hover"
              colors="primary:#121331,secondary:#c71f16"
              style={{width:'75px',height:'75px'}}>
          </lord-icon>
            <p>
            Desserts
            </p>
          </div>
        </Button> */}
        </Grid>
        <Grid xs={12}>
          <Item>
            <MenuItemTable />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>Placeholder 1 w/ xs=6</Item>
        </Grid>
        <Grid xs={6}>
          <Item>Placeholder 2 w/ xs=6</Item>
        </Grid>
      </Grid>

    </div>
    </ThemeProvider>
  );
}

export default serverPage;
  