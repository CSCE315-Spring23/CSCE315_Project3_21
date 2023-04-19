import ExcessReportTable from '../components/ExcessReportTable.js';
import React, {useState, useEffect} from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Button,
  Card,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import MainAppBar from '../components/MainAppBar.js';
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

const SearchUI = ({ search }) => {
  const [start, setStart] = React.useState(null);

  const [error1, setError1] = React.useState(null);
  const [error2, setError2] = React.useState(null);
  const [error3, setError3] = React.useState(null);

  const handleSearch = () => {

    if (!error1 && !error2) {
      if (start == null) {
        setError3("Please choose valid hours first");
        return;
      }
      setError3(null);
      search(start);
    } else {
      setError3("Please choose valid hours");
    }
  };

  return (
    <Card
      style={{ width: "50%", padding: "20px", maxWidth: "700px" }}
      variant="elevation"
    >
    <LocalizationProvider dateAdapter={AdapterDayjs} adaprterLocale={'en-gb'}>

    <DateTimePicker 
      id="start"
      value={start}
      onChange = {(e)=>setStart(e)}
      format = "YYYY/MM/DD HH:mm:ss"
    />
    </LocalizationProvider>
        <Button
          variant = "contained"
          onClick={handleSearch}
        >
          Submit
        </Button>{" "}
    </Card>
  );
};


// The grid max xs = 12
function ExcessReportPage() {
  const [data, setData] = React.useState([]);
  const [searching, setSearching] = React.useState(false);

  const search = (start) => {
    setSearching(true);
    setData([]);
  }
  return (
    <div className="ExcessReportPage">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <MainAppBar>
          </MainAppBar>
        </Grid>

        <Grid xs={12}>
          <SearchUI search = {search} />
          <Title>
            Table including all items that have used less than 10% of their inventory in the given time
          </Title>
          <Item>
            
            { searching ? "Getting result"
            :data.length == 0
            ?"none":
            "Result"
            }
            <ExcessReportTable />
          </Item>
        </Grid>
      </Grid>

    </div>
  );
}

export default ExcessReportPage;
