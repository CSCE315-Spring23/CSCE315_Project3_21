import ZReportTable from '../components/ZReportTable.js';
import XReportTable from '../components/XReportTable.js';
import React, {useState} from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

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


// The grid max xs = 12
function XZReportPage() {
  const [createdX, setCreatedX]= useState(false);
  const [createdZ, setCreatedZ]= useState(false);
  return (
    <ThemeProvider theme={cfa_theme}>
    <div className="XZPage">
          <Grid xs={12} >
            <MainAppBar />
            <Item />
            <Item />
          </Grid>
        <Grid container spacing = {2}>
          <Item>
              <Typography variant="h6" component="Grid" >
                Last Z Report
              </Typography>
              <ZReportTable createZ = {false}/>
            </Item>
            <Item>
              <Typography variant="h6" >
                Current Z Report
              </Typography>
              <div>
                Note: The Z report acts like a day summary and therefore makes the most logical sense when created at the end of each day
              </div>
            {createdZ ? <ZReportTable createZ = {true}/>
                : <Button variant = 'contained' onClick = {()=>setCreatedZ(true)}>Show Updated Z Report</Button>}
            </Item>
            <Item>
              <Typography variant="h6">
                X Report
            </Typography>
              {createdX ?<XReportTable/>
                : <Button variant = 'contained' onClick = {()=>setCreatedX(true)}>Create X Report</Button>}
            </Item>
          </Grid>

    </div>
    </ThemeProvider>
  );
}

export default XZReportPage;
