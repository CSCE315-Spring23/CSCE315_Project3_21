import ExcessReportTable from '../components/ExcessReportTable.js';
import React, {useState} from 'react';

import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

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

export default function ExcessReportPage(){
  const [start, setStart] = useState('');
  const [submit, setSubmit]= useState(false);
    return (
      <ThemeProvider theme={cfa_theme}>
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
                  format = "YYYY-MM-DD HH:mm:ss"
                />
              </LocalizationProvider>
            <Button
              variant = "contained"
              onClick ={()=>setSubmit(true)}
              >Submit
            </Button>
            <Grid xs = {1}></Grid>
            <Button
              variant = "contained"
              onClick = {()=> window.location.reload()}
            > Reset to pick new date 
              </Button>
            </Grid>
            <Item>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Table including all items that have used less than 10% of their inventory in the given time
            </Typography>
              {submit 
                ?<ExcessReportTable startVal = {start}/>
                : "No date selected"}
              
            </Item>
          </Grid>
        </Grid>
    </ThemeProvider>
  );
}