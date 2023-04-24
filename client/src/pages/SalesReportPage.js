import React, { useEffect } from "react";

import { styled } from "@mui/material/styles";
//import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import MainAppBar from "../components/MainAppBar.js";
import {
  Button,
  Card,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { width } from "@mui/system";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SearchUI = ({ search }) => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  

  const [error1, setError1] = React.useState(null);
  const [error2, setError2] = React.useState(null);
  const [error3, setError3] = React.useState(null);

  const handleSearch = () => {
    
    if (!error1 && !error2) {
      if (startDate == null || endDate == null) {
        setError3("Please choose valid date first");
        return;
      }
      setError3(null);
      search(startDate, endDate);
    } else {
      setError3("Please choose valid date");
    }
  };

  

  return (
    <Card
      style={{ width: "50%", padding: "20px", maxWidth: "700px" }}
      variant="elevation"
    >
      <Grid container>
        <Grid xs={6}>
          <Item>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => {

                  setError1(null);
                  setStartDate(e.target.value);
                }
              }
              label="Starting Date"
              type="number"
              error={error1 == null ? false : true}
              helperText={error1}
            />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>
            <TextField
              style={{ width: "100%" }}
              onChange={(e) => {
                
                  setError2(null);
                  setEndDate(e.target.value);
                
              }}
              error={error2 == null ? false : true}
              helperText={error2}
              label="Ending Date"
              type="number"
            />
          </Item>
        </Grid>

        <Grid xs={12}>
          <Item>
            <InputLabel>Sales Report Table</InputLabel>
            
          </Item>
        </Grid>
      </Grid>

      <center>
        <Button
          style={{ padding: "10px", margin: "5px" }}
          onClick={handleSearch}
        >
          Get Result
        </Button>{" "}
        <br></br>
        <span style={{ color: "red", fontSize: "14px" }}>{error3}</span>
      </center>
    </Card>
  );
};

function SalesReportPage() {
  const [data, setData] = React.useState([]);
  const [searching, setSearching] = React.useState(false);

  const search = (start, end) => {
    setSearching(true);
    setData([]);
    axios
      .get(
        `http://localhost:3001/salesReport?start=${start}&end=${end}`
      )
      .then((res) => {
        setSearching(false);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        searching(false);
      });
  };

  return (
    <div className="SalesReportPage">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <MainAppBar></MainAppBar>
        </Grid>

        <Grid xs={12}>
          <center>
            <SearchUI search={search} />
          </center>
        </Grid>

        <Grid xs={12}>
          <center>
            <h2>
              {searching
                ? "Getting Result...."
                : data.length == 0
                ? "No Result Found!"
                : "Result"}
            </h2>
          </center>
          {searching || data.length == 0 ? null : (
            <center>
              <Item style={{ width: "50%", maxWidth: "500px" }}>
                <table border={"black"} style={{ width: "100%" }}>
                  
                  
                </table>
              </Item>
            </center>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default SalesReportPage;
