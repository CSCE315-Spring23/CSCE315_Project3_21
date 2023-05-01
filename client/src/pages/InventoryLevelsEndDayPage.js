import InventoryCRUDTable from '../componentsInventoryCRUDTable.js';
import PendingRestockTable from '../components/PendingRestockTable.js';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useRef} from 'react';

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const cfa_theme = createTheme({
    palette: {
        primary: {
            main: '#E51636',
        },
        secondary: {
            main: '#E51636',
        },
    },
});


function placeRestockOnclick(){
    axios.get(`http://localhost:3001/inventoryLevelsEndDayCompletePlaceRestock`, config)
        .then(res => {
        alert('The restock order was placed. Check the console for more details');
        window.location.reload();
        })
        .catch((err) => {
            alert(err);
    });
}

function endDayOnclick(){
    axios.get(`http://localhost:3001/inventoryLevelsEndDay`, config)
        .then(res => {
        alert('The reccommended reorder quantities were updated')
        })
        .catch((err) => {
            alert(err);
    });
}

// The grid max xs = 12
function InventoryLevelsEndDayPage() {
    const inputRef = useRef(null);
    function recordArrivalOnclick(){
        let idVal = inputRef.current.value;
        let str = `http://localhost:3001/inventoryLevelsEndDayArrive?id=`+idVal;
        axios.get(str, config)
        .then(res => {
            let str2 = idVal +' was processed as arrived';
            window.location.reload();
        alert(str2);
        })
        .catch((err) => {
            alert(err);
    });

    }

    return (
    <ThemeProvider theme={cfa_theme}>
    <div className="InventoryLevelsEndDayPage">
        <Grid container spacing={2}>
        <Grid xs={12}>
            <MainAppBar>
            </MainAppBar>
        </Grid>

        <Grid xs = {6}>
            Inventory Item CRUD table to complete manual inventory or change recommended reorder quantity
            PLACEHOLDER!!!!!!
            <InventoryCRUDTable />
        </Grid>
        <Grid xs = {3}>
            <Item>
                Table with all pending restock orders
                <PendingRestockTable />
            </Item>
        </Grid>

        <Grid xs = {3}>
            <Item>
                <Button variant = 'contained' onClick = {placeRestockOnclick}>Place Restock Order</Button>
            </Item>
            <Item>
                Submit the id of the restock order:
                <input ref = {inputRef} type = "text" id = "pendingRestockId" name = "pendingRestockId"/>
                <Button variant = 'contained' onClick = {recordArrivalOnclick}>Record Arrival</Button>
            </Item>
            <Item>
                <Button variant = 'contained' onClick = {endDayOnclick}>Update Recommended Restock Order Quantities</Button>
            </Item>
            </Grid>

    </Grid>
    </div>
    </ThemeProvider>
    );
}

export default InventoryLevelsEndDayPage;
