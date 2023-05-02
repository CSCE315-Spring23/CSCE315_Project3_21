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

/**
 * 
 * @param {*} props - Functions/data to use from the parent component (ServerPage.js)
 * @returns The Menu Item Table component for the CFA Employee to use. Contains buttons to switch categories, 
 * and a Material React table which displays the menu items to view/add menu items to an order.
 */
const MenuItemTable = (props) => {

  const [MenuData, setMenuData] = useState([]);

  useEffect(() => {
    getAllMenu()
  },[])

  const columns = [
    {
      //accessorFn: (row) => row.itemname, //accessorFn used to join multiple data into a single cell
      id: 'menuItem', //id is still required when using accessorFn instead of accessorKey
      header: 'Menu Item',
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
        <Button variant = "contained"
          style = {{width: '100px', fontSize: '12px'}}
          onClick={() => {
            alert("Adding " + row.original.itemname + " to order!")
            props.AddItem(row.original.itemname);
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

  /**
   * Gets and displays all of the menu items through an XMLHttpRequest to the server and updates the component's state data.
   * 
   */
  const getAllMenu = async() => {
    axios.get(`https://pern-project-3.onrender.com/serverPage`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  /**
  * Gets and displays all of the Entree menu items through an XMLHttpRequest to the server and updates the component's state data.
  * 
  */  
  const getEntrees = async() => {
    axios.get(`https://pern-project-3.onrender.com/serverPage/getEntrees`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  /**
  * Gets and displays all of the Side menu items through an XMLHttpRequest to the server and updates the component's state data.
  * 
  */  
  const getSides = async() => {
    axios.get(`https://pern-project-3.onrender.com/serverPage/getSides`, config)
    .then(res => {
      const menuData = res.data;
      setMenuData(menuData);
      //console.log(menuData);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  /**
  * Gets and displays all of the Dessert menu items through an XMLHttpRequest to the server and updates the component's state data.
  * 
  */
  const getDesserts = async() => {
    axios.get(`https://pern-project-3.onrender.com/serverPage/getDesserts`, config)
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
      style={{fontSize : '18px',paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column', marginBottom : '10px', textTransform : 'capitalize'}}
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
      style={{fontSize : '18px' ,marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column', marginBottom : '10px', textTransform : 'capitalize'}}
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
      style={{fontSize : '18px' , marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column', marginBottom : '10px', textTransform : 'capitalize'}}
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
            {props.OrderItems.length}
          </div>
          <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
        </div>
        <h2 id = "total" >
          Order Total: {props.OrderTotal}
        </h2>
      </div>
    </div>
    <MaterialReactTable 
    columns={columns} 
    data={MenuData} 
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

export default MenuItemTable;