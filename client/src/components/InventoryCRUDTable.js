import React, { useState,useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

const InventoryCRUDTable = (props) => {

  const [InventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    getAllInventory()
  },[])

  const columns = [
    {
      id: 'itemname',
      header: 'Inventory Item Name',
      accessorKey: 'itemname',
      size: 100,
      
      Cell: ({ renderedCellValue, row }) => (  
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
        <span>{renderedCellValue}</span>
        </Box>
      ),
    },
    {
      size: 50,
      accessorKey: 'shipmentunit',
      header: 'Shipment Unit in Product Units',
    },
    {
      size: 50,
      accessorKey: 'shipmentunitstring',
      header: 'Shipment Unit Represented in Words',
    },
    {
        size: 50,
        accessorKey: 'currentquantity',
        header: 'Current Quantity in Product Units',
    },
    {
        size: 50,
        accessorKey: 'maxquantity',
        header: 'Maximum Quantity in Product Units',
    },
    {
        size: 50,
        accessorKey: 'recommendedreorder',
        header: 'Reorder Quantity in Shipment Units',
    },
  ];

  const getAllInventory = async() => {
    axios.get(`http://localhost:3001/readInventoryItems`, config)
    .then(res => {
      const inventoryData = res.data;
      setInventoryData(inventoryData);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  return (
  <div>
    <MaterialReactTable 
    columns={columns} 
    data={inventoryData} 
    muiTableHeadCellProps={{
    //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        textDecoration: 'underline',
        fontSize: '22px'
      }, 
    }}
    muiTableBodyCellProps={{
      sx: {
        fontSize : '18px',
        color : '#1A5276',
      }
    }}
    />
    
  </div>
  );
};

export default InventoryCRUDTable;