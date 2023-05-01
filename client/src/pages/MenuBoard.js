import React from "react";
import { useState,useEffect } from "react";
import MenuBoardBar from '../components/MenuBoardBar.js';
import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {Row, Col, Button, Card} from 'antd';
import ItemCard from "../components/MenuBoardCards.js";
import ReactWeatherComponent from "../components/ReactWeatherComponent.js";


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
/**
 * 
 * MenuBoard function created to generate the menu board page. 
 * 
 * 
 */
const MenuBoard = () => {
    const [itemsData,setItemsData] = useState([])
  /**
 * 
 * getSomeMenuItems function created to query the database for a few random menu items 
 * to use on the menu board
 * 
 * 
 */
    useEffect(() => {
        const getSomeMenuItems = async() => {
            axios.get(`http://localhost:3001/GetSomeMenuItems`, config)
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
        getSomeMenuItems()
    },[])
    
/**
 * 
 * returns the menu board with the items in cards with the weather displayed below that. 
 * 
 */
    return (
        <div className="MenuBoard">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MenuBoardBar>           
            </MenuBoardBar>
          </Grid >
        
          <Grid xs={12}>  
            <Row >
                {
                  itemsData.map(item => (
                      <Col span = {4}>
                      <ItemCard item = {item} />
                      </Col>
                  ))
                }
            </Row>
          </Grid>
          <Grid xs={12}>
            
            <ReactWeatherComponent>
            </ReactWeatherComponent>
            
            </Grid>
        </Grid>
  
      </div>
    );
};

export default MenuBoard;