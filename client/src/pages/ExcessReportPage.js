import ExcessReportTable from '../components/ExcessReportTable.js';
import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import { TextField, Button } from '@mui/material';

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

export default class ExcessReportPage extends React.Component {
  render() {
    var startIn = "2023-02-28 22:30:00";
    return (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MainAppBar>
            </MainAppBar>
          </Grid>
  
          <Grid xs={12}>
            <Grid>
                <TextField 
                  helperText = "Enter Start Timestamp:" 
                  id = {startIn} 
                  label = "YYYY-MM-DD HH:MM:SS" 
                />
                <Button variant = 'contained'
                  >Submit</Button>
            </Grid>
            <Item>
              <Title>
                Table including all items that have used less than 10% of their inventory in the given time
              </Title>
              <ExcessReportTable startVal = {startIn}/>
            </Item>
          </Grid>
        </Grid>
    );
  }
}
