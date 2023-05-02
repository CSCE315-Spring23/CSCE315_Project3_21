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
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);
  const [selected, setSelected] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const [error1, setError1] = React.useState(null);
  const [error2, setError2] = React.useState(null);
  const [error3, setError3] = React.useState(null);

  const handleSearch = () => {
    let salesWith = selected;
    if(selected == "Any Items")
        salesWith = "";

    if (!error1 && !error2) {
      if (startHour == null || endHour == null) {
        setError3("Please choose valid hours first");
        return;
      }
      setError3(null);
      search(startHour, endHour, salesWith);
    } else {
      setError3("Please choose valid hours");
    }
  };

  //populate options
  useEffect(() => {
    axios
      .get("http://https://pern-project-3.onrender.com/menuCustomerView")
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
                if (e.target.value > 24) {
                  setError1("Starting hour must be less than 24");
                } else {
                  setError1(null);
                  setStartHour(e.target.value);
                }
              }}
              label="Starting Hour"
              type="number"
              inputProps={{ min: "0", max: "24" }}
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
                if (e.target.value > 24) {
                  setError2("Ending hour must be less than 24");
                } else if (e.target.value < startHour) {
                  setError2("Ending hour must be greater than starting hour");
                } else {
                  setError2(null);
                  setEndHour(e.target.value);
                }
              }}
              error={error2 == null ? false : true}
              helperText={error2}
              label="Ending hour"
              type="number"
              inputProps={{ min: "0", max: "23" }}
            />
          </Item>
        </Grid>

        <Grid xs={12}>
          <Item>
            <InputLabel>Items that sales with</InputLabel>
            <Select
              value={selected}
              style={{ width: "100%" }}
              onChange={(e) => {
                setSelected(e.target.value);
              }}
            >
              <MenuItem value="Any Items">Any items</MenuItem>
              {options.map((option, i) => {
                return (
                  <MenuItem key={i} value={option.itemname}>
                    {option.itemname}
                  </MenuItem>
                );
              })}
            </Select>
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

function WhatSalesTogetherPage() {
  const [data, setData] = React.useState([]);
  const [searching, setSearching] = React.useState(false);

  const search = (start, end, salesWith) => {
    setSearching(true);
    setData([]);
    axios
      .get(
        `http://https://pern-project-3.onrender.com/WhatSalesTogether?start=${start}&end=${end}&salesWith=${salesWith}`
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
    <div className="RestockReportPage">
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
                  <tr>
                    <th>Pairs</th>
                    <th>Quantity</th>
                  </tr>
                  {data.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <span style={{ color: "red" }}>{item.item1}</span>
                          <br></br>
                          <span style={{ color: "red" }}>{item.item2}</span>
                        </td>
                        <td>{item.count}</td>
                      </tr>
                    );
                  })}
                </table>
              </Item>
            </center>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default WhatSalesTogetherPage;
