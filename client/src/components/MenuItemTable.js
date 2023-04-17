import React from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'


const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

const columns = [
  {
    accessorFn: (row) => row.itemname, //accessorFn used to join multiple data into a single cell
    id: 'menuItem', //id is still required when using accessorFn instead of accessorKey
    header: 'Menu Item',
    size: 250,
    Cell: ({ renderedCellValue, row }) => (  
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
      <Button variant = "contained"
        onClick={() => {
          alert(row.original.itemname) 
          axios.get(`http://localhost:3001/XReport`, config)
          .then(res => {
          console.log("Howdy")
          })
          .catch((err) => {
          console.error(err);
          });
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
    accessorKey: 'price',
    header: 'Price($)',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },

];

export default class MenuItemTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data : [],
    };

    this.handleEntrees = this.handleEntrees.bind(this)
    this.handleDesserts = this.handleDesserts.bind(this)
    this.handleSides = this.handleSides.bind(this)
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/serverPage`, config)
      .then(res => {
        const menuData = res.data;
        this.setState({ data: menuData });
      })
      .catch((err) => {
        console.error(err);
      });
    
  }

  handleEntrees() {
    axios.get(`http://localhost:3001/ServerPage/getEntrees`, config)
      .then(res => {
        const entreeData = res.data;
        this.setState({data: entreeData});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleSides() {
    axios.get(`http://localhost:3001/ServerPage/getSides`, config)
      .then(res => {
        const sidesData = res.data;
        this.setState({data: sidesData});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleDesserts() {
    axios.get(`http://localhost:3001/ServerPage/getDesserts`, config)
      .then(res => {
        const entreeData = res.data;
        this.setState({data: entreeData});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render()  {
    // console.log(this.state.data.at(0));
    return (
    <div>
        <Button 
        variant = "outlined" 
        style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}
        onClick={this.handleEntrees}
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
        style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}
        onClick = {this.handleSides}
        >
          <div align = "center">
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
          </div>
        </Button>
        <Button 
        variant = "outlined" 
        style={{marginLeft : '3%', paddingLeft : '3%', paddingRight : '3%', alignContent : 'center', flexDirection : 'column'}}
        onClick = {this.handleDesserts}
        >
          <div align = "center">
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
          </div>
        </Button>
      <MaterialReactTable 
      columns={columns} 
      data={this.state.data} 
      displayColumnDefOptions={{
        'mrt-row-numbers': {
          size: 10,
        },
        'mrt-row-expand': {
          size: 10,
        },
      }}
      
      //handleEntrees = {this.handleEntrees}

      muiTableHeadCellProps={{
      //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          fontSize: '25px',
        }, 
      }}

      muiTableBodyCellProps={{
        sx: {
          fontSize : '18px'
        }
      }}
    />

        </div>);
  }

};