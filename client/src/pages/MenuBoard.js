import React from "react";
import { useState,useEffect } from "react";
import MainAppBar from '../components/MainAppBar.js';
import axios from "axios";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {Row, Col, Button} from 'antd';
import ItemCard from "../components/MenuBoardCards.js";

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

const MenuBoard = () => {
    const [itemsData,setItemsData] = useState([])

    useEffect(() => {
        const getAllMenu = async() => {
            axios.get(`http://localhost:3001/serverPage`, config)
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

    const getEntrees = async() => {
      axios.get(`http://localhost:3001/serverPage/getEntrees`, config)
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

    const getSides = async() => {
      axios.get(`http://localhost:3001/serverPage/getSides`, config)
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

    const getDesserts = async() => {
      axios.get(`http://localhost:3001/serverPage/getDesserts`, config)
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

    return (
        <div className="serverPage">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MainAppBar>           
            </MainAppBar>
          </Grid>
          <Grid xs = {12}>
            <Button className="category-button" onClick={getEntrees}> 
              <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
              <lord-icon
              src="https://cdn.lordicon.com/xnfkhcfn.json"
              trigger="hover"
              colors="primary:#c71f16,secondary:#121331"
              style={{width:'75px' ,height:'75px'}}>
              </lord-icon>
              Entrees
            </Button>

            <Button className="category-button" onClick={getSides}> 
              <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
              <lord-icon
                  src="https://cdn.lordicon.com/fkytfmrm.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#c71f16"
                  style={{width:'75px',height:'75px'}}>
              </lord-icon>    
              Sides
            </Button>

            <Button className="category-button" onClick={getDesserts}> 
              <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
              <lord-icon
                  src="https://cdn.lordicon.com/elzyzcar.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#c71f16"
                  style={{width:'75px',height:'75px'}}>
              </lord-icon>
              Desserts
            </Button>
          </Grid>
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
        </Grid>
  
      </div>
    );
};

export default MenuBoard;