
import PendingRestockTable from '../components/PendingRestockTable.js';
import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import { TextField } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Title = styled(Paper)(({ theme }) => ({
    ...theme.typography.heading,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
}));

// The grid max xs = 12
function InventoryLevelsEndDayPage() {
    return (
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
                <button>Place Restock Order</button>
            </Item>
            <Item>
                <TextField helperText = "Submit the id of the restock order:" id = "pendingRestockId"/>
                <button>Record Arrival</button>
            </Item>
            <Item>
                <button>End Day/ create Day Summary/ create Z Report</button>
            </Item>
            </Grid>

    </Grid>
    </div>
    
    );
}

export default InventoryLevelsEndDayPage;
