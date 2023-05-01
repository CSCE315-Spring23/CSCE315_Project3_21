import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import {Delete, Edit} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box'

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

const InventoryCRUDTable = (props) => {
  const [InventoryData, setInventoryData] = useState([]);

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        //update the db table
        let queryStr = 'http://localhost:3001/createOrUpdateInventoryItem';
        axios.post(queryStr,values,config)
        .then(res => {
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        });

        //handle on the material react table
        InventoryData[row.index] = values;
        setInventoryData([...InventoryData]);//send/receive api updates here, then refetch or update local table data for re-render
        exitEditingMode(); //required to exit editing mode and close modal
    };

  useEffect(() => {
    getAllInventory()
  },[])

  const columns = [
    {
      header: 'Item Name',
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
    editingMode="modal"
    enableEditing
    onEditingRowSave={handleSaveRowEdits}
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
      maxSize: 50,
      size: 20,
    }}
    renderRowActions={({ row, table }) => (
        <Box>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
    
  </div>
  );
};

export default InventoryCRUDTable;