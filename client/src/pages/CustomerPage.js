import React from 'react';
import axios from 'axios';
import { useEffect} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import CustomerMenu from '../components/CustomerMenu.js'
import OrderCart from '../components/OrderCart.js';
import {ThemeProvider, createTheme } from '@mui/material';
import MenuBoardBar from '../components/MenuBoardBar.js';

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import {Tabs} from 'antd';


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

// The grid max xs = 12
const CustomerPage = () => {

  function addItemHandler(ItemName) {
    axios.get(`http://localhost:3001/addItem?menuitem=` + ItemName, config)
      .then(res => {
        const orderData = res.data.itemsOrdered;
        const OrderTot = res.data.totalprice;
        setOrderItems(orderData);
        setOrderTotal("$"+ OrderTot/100);
  
        document.getElementById('num-items').innerText = orderItems.length;
        document.getElementById('total').innerText = "Total price: $" + OrderTot/100;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function removeItemHandler(ItemName) {
    axios.get(`http://localhost:3001/removeItem?menuitem=` + ItemName, config)
      .then(res => {
        const orderData = res.data.itemsOrdered;
        const OrderTot = res.data.totalprice;
        setOrderItems(orderData);
        setOrderTotal("$"+ OrderTot/100);
  
        document.getElementById('num-items').innerText = orderItems.length;
        document.getElementById('total').innerText = "Total price: $" + OrderTot/100;
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getCurrentOrder() {
    axios.get(`http://localhost:3001/getOrder`, config)
    .then(res => {
      const orderData = res.data.itemsOrdered;
      const OrderTot = res.data.totalprice;
      setOrderItems(orderData);
      setOrderTotal("$"+ OrderTot/100);

      document.getElementById('num-items').innerText = orderItems.length;
      document.getElementById('total').innerText = "Total price: $" + OrderTot/100;
    })
    .catch((err) => {
      console.error(err);
    });  
  }

  function sendOrderHandler() {
    axios.get(`http://localhost:3001/storeOrder`, config)
    .then(res => {
      alert("Your order will now be sent and made!")
      const orderData = res.data.itemsOrdered;
      const OrderTot = res.data.totalprice;
      setOrderItems(orderData);
      setOrderTotal("$"+ OrderTot/100);

      document.getElementById('num-items').innerText = orderItems.length;
      document.getElementById('total').innerText = "Total price: $" + OrderTot/100;
    })
    .catch((err) => {
      console.error(err);
    }); 
  }

  function cancelOrderHandler() {
    axios.get(`http://localhost:3001/cancelOrder`, config)
    .then(res => {
      alert("Cancelling order and removing items.")
      const orderData = res.data.itemsOrdered;
      const OrderTot = res.data.totalprice;
      setOrderItems(orderData);
      setOrderTotal("$"+ OrderTot/100);

      document.getElementById('num-items').innerText = orderItems.length;
      document.getElementById('total').innerText = "Total price: $" + OrderTot/100;
    })
    .catch((err) => {
      console.error(err);
    }); 
  }


  const [orderItems, setOrderItems] = React.useState([]);
  const [ordertotal, setOrderTotal] = React.useState("$0");

  useEffect(() => {
    getCurrentOrder();
  },[])

  const items = [
    {
      label: 'Menu',
      key: '1',
      children: <CustomerMenu 
        OrderItems = {orderItems}
        OrderTotal = {ordertotal} 
        AddItem = {addItemHandler}> 
      </CustomerMenu>
    },
    {
      label: 'View Order',
      key: '2',
      children: <OrderCart 
        OrderItems = {orderItems} 
        OrderTotal = {ordertotal} 
        RemoveItem = {removeItemHandler}
        SendOrder = {sendOrderHandler}
        CancelOrder = {cancelOrderHandler}
        >
        
      </OrderCart>
    }
  ]

  return (
    <ThemeProvider theme={theme}>
    <div className="serverPage">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <MenuBoardBar>     
          </MenuBoardBar>
        </Grid>
        <Grid xs = {12}>
          <Tabs 
          tabPosition='left'
          defaultActiveKey='1'
          items = {items}
          >  
          </Tabs>
        </Grid>
      </Grid>

    </div>
    </ThemeProvider>
    );
  
}

export default CustomerPage;

  
