import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import MenuItemTable from '../components/MenuItemTable.js';
import { Button, Menu, MenuItem, ThemeProvider, createTheme } from '@mui/material';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { Descriptions } from 'antd';
import {Tabs} from 'antd';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

const items = [
    {
      label: 'Menu',
      key: '1',
      children: <MenuItemTable></MenuItemTable>
    },
    {
      label: 'View Order',
      key: '2',
      children: <div></div>
    }
  ]

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
const ServerPage = () => {

  return (
    <ThemeProvider theme={theme}>
    <div className="serverPage">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <MainAppBar>     
          </MainAppBar>
        </Grid>
        <Grid xs = {12}>
          <Tabs 
          tabPosition='left'
          defaultActiveKey='1'
          items = {items}
          >  
          </Tabs>
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

export default ServerPage;

  
