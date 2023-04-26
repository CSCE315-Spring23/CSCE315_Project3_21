import PendingRestockTable from '../components/PendingRestockTable.js';
import React from 'react';

import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import Button from '@mui/material/Button';
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

function zOnClick(){
    axios.get(`http://localhost:3001/inventoryLevelsEndDayCompleteDaySummary`, config)
        .then(res => {
        alert('The day summary/ Z report was created');
        })
        .catch((err) => {
            alert(err);
    });
}
function xOnClick(){
    axios.get(`http://localhost:3001/inventoryLevelsEndDayCompleteDaySummary`, config)
        .then(res => {
        alert('The day summary/ Z report was created');
        })
        .catch((err) => {
            alert(err);
    });
}

// The grid max xs = 12
function XZReportPage() {
  return (
    <ThemeProvider theme={cfa_theme}>
    <div className="XZPage">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MainAppBar>
            </MainAppBar>
          </Grid>
          <Grid xs={4}>
            <Item>
                <Button variant = 'contained' onClick = {xOnClick}>Create X Report</Button>
            </Item>
            <Item>
                <Button variant = 'contained' onClick = {zOnClick}>Create Z Report</Button>
            </Item>
          </Grid>
          <Grid xs={4}>
            X Report
            <PendingRestockTable/>
          </Grid>
          <Grid xs={4}>
            Z Report
            <PendingRestockTable/>
          </Grid>
        </Grid>
    </div>
    </ThemeProvider>
  );
}

export default XZReportPage;
