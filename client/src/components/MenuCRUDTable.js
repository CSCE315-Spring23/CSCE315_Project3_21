/*
UI for Create, Read, Update, and Delete operations on menu-item database table
*/
import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import {Edit} from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

/*
primary reference for the following table https://www.material-react-table.com/docs/examples/editing-crud
CRUD stands for Create, Read, Update, Delete 
This example does not include delete given the scope of the assignment
*/
const MenuCRUDTable = (props) => {
  const [MenuData, setMenuData] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateNewRow = (values) => {
    let queryStr = 'https://pern-project-3.onrender.com/createOrUpdateMenuItem';
        axios.post(queryStr,values,config)
        .then(res => {
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    MenuData.push(values);
    setMenuData([...MenuData]);
  };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        //update the db table
        let queryStr = 'https://pern-project-3.onrender.com/createOrUpdateMenuItem';
        axios.post(queryStr,values,config)
        .then(res => {
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        });

        //handle on the material react table
        MenuData[row.index] = values;
        setMenuData([...MenuData]);//send/receive api updates here, then refetch or update local table data for re-render
        exitEditingMode(); //required to exit editing mode and close modal
    };
    
  useEffect(() => {
    getAllMenu()
  }, [])

  const columns = [
    {
      header: 'Item Name',
      accessorKey: 'itemname',
    },
    {
        header: 'Price',
        accessorKey: 'price',
    },
    {
        header: 'Category',
        accessorKey: 'category',
    },
    {
        header: 'Inventory Items',
        accessorKey: 'menutoinventory',
    },
    {
        header: 'Dietary Restrictions',
        accessorKey: 'menutodietaryrestriction',
    },
    {
      header: 'Image Link',
      accessorKey: 'imagelink',
  },
  ];

  const getAllMenu = async() => {
    axios.get(`https://pern-project-3.onrender.com/readMenuItems`, config)
    .then(res => {
        const allItemNames = res.data;
        for(let i = 0; i<allItemNames.length;i++){
            const currItem = allItemNames[i].itemname;
            const itemStr = 'https://pern-project-3.onrender.com/readMenuItem?name='+currItem;
            axios.get(itemStr, config)
            .then(results => {
                console.log(results.data);
                MenuData.push(results.data);
                setMenuData([...MenuData]);
            })
        }
    })
    .catch((err) => {
      console.error(err);
    });
  }
  return (
  <div>
    <MaterialReactTable 
    columns={columns} 
    data={MenuData}
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
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <Button
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          Create New Menu Item
        </Button>
      )}
    />
    <CreateNewRowModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />

  </div>
  );
};

export const CreateNewRowModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((item, column) => {
        item[column.accessorKey ?? ''] = '';
        return item;
      }, {}),
    );

    const handleSubmit = () => {
      //put your validation logic here
      onSubmit(values);
      onClose();
    };

    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New Menu Item</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack>
              {columns.map((column) => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              ))}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create New Menu Item
          </Button>
        </DialogActions>
      </Dialog>
    );
};

export default MenuCRUDTable;