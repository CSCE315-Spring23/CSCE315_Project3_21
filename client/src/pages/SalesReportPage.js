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
import SalesReportTable from '../components/SalesReportTable.js';
/**
 * The request body should be an object with the following properties:
 *
 * {
 *  start: int, // 0-23
 *  end: int, // 0-23
 *  salesWith: "menu_item_id" , //optional (default null)
 *  limit: int //optional number of results to return (default 100)
 * }
 */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
/**
 * 
 * Title 
 * 
 */
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

export default function SalesReportPage(){
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
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

              <LocalizationProvider dateAdapter={AdapterDayjs} adaprterLocale={'en-gb'}>
                <DateTimePicker 
                  value={end}
                  onChange={(e)=>setEnd(e)} 
                  format = "YYYY-MM-DD HH:mm:ss"
                />
              </LocalizationProvider>
            <Button
              variant = "contained"
              onClick ={()=>setSubmit(true)}
              >submit
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
                Sales Report Table
            </Typography>
              {submit
                ?<SalesReportTable startVal = {start} endVal = {end}/>
                : "No date selected"}
              
            </Item>
          </Grid>
        </Grid>
    </ThemeProvider>
  );
}