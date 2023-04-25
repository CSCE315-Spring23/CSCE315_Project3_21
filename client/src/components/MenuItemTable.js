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

function addItemHandler(ItemName) {
  axios.get(`http://localhost:3001/addItem?menuitem=` + ItemName, config)
    .then(res => {
      console.log(res.data);
      document.getElementById('total').innerText = "Total price: $" + res.data.totalprice/100;
      document.getElementById('num-items').innerText = res.data.itemsOrdered.length;
    })
    .catch((err) => {
      console.error(err);
    });
}

const columns = [
  {
    //accessorFn: (row) => row.itemname, //accessorFn used to join multiple data into a single cell
    id: 'menuItem', //id is still required when using accessorFn instead of accessorKey
    header: 'Menu Item',
    size: 100,
    
    Cell: ({ renderedCellValue, row }) => (  
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
      <Button variant = "contained"
        style = {{width: '100px', fontSize: '12px'}}
        onClick={() => {
          alert("Adding " + row.original.itemname + " to order!")
          addItemHandler(row.original.itemname)
          }
        }>
        Add Item
      </Button>
      <img
        alt="avatar"
        height={50}
        src={(row.original.imageLink)}
        loading="lazy"
        style={{ borderRadius: '50%' }}
      />
      {row.original.itemname}
      {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
      <span>{renderedCellValue}</span>
      </Box>
    ),
  },
  {
    size: 50,
    accessorKey: 'price',
    header: 'Price($)',
  },
  {
    size: 50,
    accessorKey: 'category',
    header: 'Category',
  },

];

const MenuItemTable = () => {

  const [MenuData, setMenuData] = useState([]);
  const [ordertotal, setOrderTotal] = React.useState("$0");
  const [orderItems, setOrderItems] = React.useState([]);

  useEffect(() => {
    getAllMenu()
    getCurrentOrder()
  },[])

  const getAllMenu = async() => {
    axios.get(`http://localhost:3001/serverPage`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

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

  const getEntrees = async() => {
    axios.get(`http://localhost:3001/serverPage/getEntrees`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const getSides = async() => {
    axios.get(`http://localhost:3001/serverPage/getSides`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  const getDesserts = async() => {
    axios.get(`http://localhost:3001/serverPage/getDesserts`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  
  return (
  <div>
    <div className = "server-tab">
      <Button 
      variant = "outlined" 
      style={{paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column', marginBottom : '10px'}}
      onClick={getEntrees}
      >
        <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
        <lord-icon
            src="https://cdn.lordicon.com/xnfkhcfn.json"
            trigger="hover"
            colors="primary:#c71f16,secondary:#121331"
            style={{width:'75px' ,height:'75px'}}>
       </lord-icon>
        <p>
        Entrees
        </p>
      </Button>  

      <Button 
      variant = "outlined" 
      style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column', marginBottom : '10px'}}
      onClick = {getSides}
      >
        <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
        <lord-icon
          src="https://cdn.lordicon.com/fkytfmrm.json"
          trigger="hover"
          colors="primary:#121331,secondary:#c71f16"
          style={{width:'75px',height:'75px'}}>
        </lord-icon>
        <p>
        Sides
        </p>
      </Button>

      <Button 
      variant = "outlined" 
      style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column', marginBottom : '10px'}}
      onClick = {getDesserts}
      >
        <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
        <lord-icon
          src="https://cdn.lordicon.com/elzyzcar.json"
          trigger="hover"
          colors="primary:#121331,secondary:#c71f16"
          style={{width:'75px',height:'75px'}}>
        </lord-icon>
        <p>
        Desserts
        </p>
      </Button>
      <div className='order-info'>
        <div className = 'shopping-cart'>
          <div id = 'num-items'>
            {orderItems.length}
          </div>
          <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
        </div>
        <h2 id = "total" >
          Order Total: {ordertotal}
        </h2>
      </div>
    </div>
      <MaterialReactTable 
      columns={columns} 
      data={MenuData} 
      muiTableHeadCellProps={{
      //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          fontSize: '22px'
        }, 
      }}

      muiTableBodyCellProps={{
        sx: {
          fontSize : '18px'
        }
      }}
      />
    </div>
    );
};

export default MenuItemTable;