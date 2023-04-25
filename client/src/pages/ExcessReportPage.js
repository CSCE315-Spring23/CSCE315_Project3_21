import ExcessReportTable from '../components/ExcessReportTable.js';
import React, {useState} from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import { Button } from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

export default function ExcessReportPage(){
  const [start, setStart] = useState('');
  var startIn = "2023-02-28 22:30:00";
    return (
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MainAppBar>
            </MainAppBar>
          </Grid>
          <Grid xs={12}>
            <Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs} adaprterLocale={'en-gb'}>
                <DateTimePicker 
                  value={start}
                  onChange={(e)=>setStart(e)}
                  format = "YYYY/MM/DD HH:mm:ss"
                />
              </LocalizationProvider>
            <Button
              variant = "contained"
              onClick ={()=>alert(start)}
              >Submit
            </Button>
            </Grid>
            <Item>
              <Title>
                Table including all items that have used less than 10% of their inventory in the given time
              </Title>
              <ExcessReportTable startVal = {start}/>
            </Item>
          </Grid>
        </Grid>
  );
}