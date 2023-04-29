import React from 'react';
import MaterialReactTable from 'material-react-table';
import Box from '@mui/material/Box'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'; 
import {
    IconButton,
    Tooltip,
  } from '@mui/material';
import { Delete } from '@mui/icons-material';

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

const OrderCart = (props) => {

    
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
        <button className='checkout-button' onClick={props.SendOrder}>
          Send Order
        </button>
        <MaterialReactTable 
        columns={columns}
        data = {props.OrderItems}
        enableEditing
        renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="right" title="Remove Item">
                <IconButton color="error" 
                  onClick={() => {
                    alert("Removing " + row.original.itemname + " from order!")
                    props.RemoveItem(row.original.itemname);
                  }}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          muiTableHeadCellProps={{
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontSize: '22px',
              textDecoration: 'underline'
            }, 
          }}
          muiTableBodyCellProps={{
            sx: {
              fontSize : '18px',
              color: '#1A5276'
            }
          }}
        >
        </MaterialReactTable>
      </div>  

    )
}

export default OrderCart;