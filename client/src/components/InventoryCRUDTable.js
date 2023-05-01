import React, { useState,useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import {Edit} from '@mui/icons-material';
import { Icon, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box'

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
        id:'action',
        header:'Action',
        accessorKey:'action',
        size:10,
        Cell: ({ renderedCellValue, row }) => (  
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
            <Tooltip arrow placement="left" title="Edit">
              <IconButton >
                <Edit />
              </IconButton>
            </Tooltip>
            <span>{renderedCellValue}</span>
            </Box>
        ),//would be very easy to add delete functionality but backend does not exist so I did not 
    },
    {
      header: 'Inventory Item Name',
      accessorKey: 'itemname',
    },
    {
      accessorKey: 'shipmentunit',
      header: 'Shipment Unit (Product Units)',
    },
    {
      accessorKey: 'shipmentunitstring',
      header: 'Shipment Unit (Words)',
    },
    {
        accessorKey: 'currentquantity',
        header: 'Current Quantity (Product Units)',
    },
    {
        accessorKey: 'maxquantity',
        header: 'Maximum Quantity (Product Units)',
    },
    {
        accessorKey: 'recommendedreorder',
        header: 'Reorder Quantity (Shipment Units)',
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
    data={InventoryData}
    muiTableHeadCellProps={{
    //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontSize: '15px'
      }, 
    }}
    muiTableBodyCellProps={{
      sx: {
        fontSize : '13px',
      }
    }}
    muiTableProps={{sx :{tableLayout:'fixed'}}}
    defaultColumn={{
      minSize: 5,
      maxSize: 80,
      size: 20,
    }}
    />
    
  </div>
  );
};

export default InventoryCRUDTable;