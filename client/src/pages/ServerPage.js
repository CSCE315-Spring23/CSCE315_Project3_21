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
import { ShoppingCartOutlined } from '@ant-design/icons';


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
const ServerPage = () => {

  const [ordertotal, setOrderTotal] = React.useState("$0");
  const [orderItems, setOrderItems] = React.useState([]);

  const getCurrentOrder = async() => {
    axios.get(`http://localhost:3001/getOrder`, config)
    .then(res => {
      const orderData = res.data.itemsOrdered;
      const orderPrice = res.data.totalprice;
      setOrderItems(orderData);
      setOrderTotal("$"+orderPrice/100);
      //console.log(ordertotal);
    })
    .catch((err) => {
      console.error(err);
    });  
  }
  useEffect(() => {
    getCurrentOrder()
    
  },[])

  return (
    <ThemeProvider theme={theme}>
    <div className="serverPage">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <MainAppBar>     
          </MainAppBar>
        </Grid>
        <Grid xs = {12}>
            <div style={{marginLeft : "50px", }}>
              <p>
              Order Total : {ordertotal}
              </p>
              <p>
              # of Items Ordered : {orderItems.length}
              </p>
              <Button 
                style={{height: '50px', width: '180px'}}
                onClick={() => {
                  axios.get(`http://localhost:3001/getOrder`, config)
                  .then(res => {
                  setOrderTotal("$" + res.data.totalprice/100);
                  setOrderItems(res.data.itemsOrdered);
                })
                .catch((err) => {
                  console.error(err);
                });
                }}>
                View Order
                <ShoppingCartOutlined/>
              </Button>
            </div>
        </Grid>
        <Grid xs={12}>  
          <Item>
            <MenuItemTable/>
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

export default ServerPage;

  
