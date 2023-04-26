import React, { useState,useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 
import {
    IconButton,
    Tooltip,
  } from '@mui/material';
import { Delete } from '@mui/icons-material';

const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

const columns = [
    {
        accessorKey: 'itemname',
        header: 'Menu Item',
        size: 50,
    },
    {
        size: 50,
        accessorKey: 'price',
        header: 'Price($)',
    },
];

const ShoppingCartTable = (props) => {

    useEffect(() => {
       //props.GetOrder();
      },[])

    return (
      <div>
        <div className='order-info'>
        <div className = 'shopping-cart'>
          <div id = 'num-items'>
            {props.OrderItems.length}
          </div>
          <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
        </div>
        <h2 id = "total" >
          Order Total: {props.OrderTotal}
        </h2>
        </div>
        <MaterialReactTable 
        columns={columns}
        data = {props.OrderItems}
        enableEditing
        renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => {}}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        >
        </MaterialReactTable>
      </div>  

    )
}

export default ShoppingCartTable;