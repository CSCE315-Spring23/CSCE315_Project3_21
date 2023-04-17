
import PendingRestockTable from '../components/PendingRestockTable.js';
import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

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
        })
        .catch((err) => {
            alert(err);
    });
}

function recordArrivalOnclick(){
    alert('hello1');
}

function endDayOnclick(){
    axios.get(`http://localhost:3001/inventoryLevelsEndDay`, config)
        .then(res => {
        alert('The reccommended reorder quantities were updated')
        })
        .catch((err) => {
            alert(err);
    });

    axios.get(`http://localhost:3001/inventoryLevelsEndDayCompleteDaySummary`, config)
        .then(res => {
        alert('The day summary/ Z report was created');
        })
        .catch((err) => {
            alert(err);
    });
}

// The grid max xs = 12
function InventoryLevelsEndDayPage() {
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
            <PendingRestockTable />
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
                <TextField helperText = "Submit the id of the restock order:" id = "pendingRestockId"/>
                <Button variant = 'contained' onClick = {recordArrivalOnclick}>Record Arrival</Button>
            </Item>
            <Item>
                <Button variant = 'contained' onClick = {endDayOnclick}>End Day/ create Day Summary/ create Z Report</Button>
            </Item>
            </Grid>

    </Grid>
    </div>
    </ThemeProvider>
    );
}

export default InventoryLevelsEndDayPage;
