import React from "react";
import { useState,useEffect } from "react";
import MainAppBar from '../components/MainAppBar.js';
import MenuItemTable from '../components/MenuItemTable.js';
import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';
//import React from 'react';
//import axios from 'axios';
import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
//import Grid from '@mui/material/Unstable_Grid2';
//import MainAppBar from '../components/MainAppBar.js';
//import MenuItemTable from '../components/MenuItemTable.js';
import { Button, Menu, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import {Row, Col} from 'antd';
import ItemList from "../components/ItemList.js";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  };

const StaticMenu = () => {
    const [itemsData,setItemsData] = useState([])

    useEffect(() => {
        const getAllMenu = async() => {
            axios.get(`http://localhost:3001/serverPage/getMenu`, config)
            .then(res => {
              const menuData = res.data;
              setItemsData(menuData);
              console.log(menuData);
              //this.setState({ data: menuData });
            })
            .catch((err) => {
              console.error(err);
            });
        }
        getAllMenu()
    },[])

    return (
        <div className="serverPage">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MainAppBar>
              
            </MainAppBar>
          </Grid>
          <Grid xs = {12}>
          </Grid>
          <Grid xs={12}>  
            <Row>
                {
                    itemsData.map(item => (
                        <Col xs={24} lg={6} md={12} sm={6}>
                        <ItemList item = {item} />
                        </Col>
                    ))
                }
            </Row>
          </Grid>
          <Grid xs={6}>
            <Item>Placeholder 1 w/ xs=6</Item>
          </Grid>
          <Grid xs={6}>
            <Item>Placeholder 2 w/ xs=6</Item>
          </Grid>
        </Grid>
  
      </div>
    );
};

export default StaticMenu;