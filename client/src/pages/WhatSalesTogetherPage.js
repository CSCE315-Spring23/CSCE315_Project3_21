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

/**
 * Styled item for theme
 */
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

/**
 * Search UI component. Handles user interactions with the search input.
 * It has two number input field, one dropdown and a search button.
 * Handles inter states of the input fields and dropdown, filter outs wrong value.
 * Calls the supplied search function with 3 input parameter
 * 
 * @param {Function} search- An Async function that takes three parameter
 *   
 */
const SearchUI = ({ search }) => {

  /**
   * Maintains the value of the 3 search UI components
   */
  const [startHour, setStartHour] = React.useState(null);
  const [endHour, setEndHour] = React.useState(null);
  const [selected, setSelected] = React.useState("");
  
  /**
   * Array of menu items to populate the select
   */
  const [options, setOptions] = React.useState([]);


  /**
   * This state will hold the error message if the first input field (startHour)
   * is invalid.
   */
  const [error1, setError1] = React.useState(null);
  
  
  /**
   * This state will hold the error message if the second input field (EndHour)
   * is invalid.
   */
  const [error2, setError2] = React.useState(null);
  
  /**
   * This state will hold the error message to show to the user when
   * user presses 'search' with invalid inputs
   */
  const [error3, setError3] = React.useState(null);


  /**
   * 
   * Handles click on the search button.
   * validates the input before calling search
   */
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

  /**
   * get the list of the menu items to populate the <select>
   */
  useEffect(() => {
    axios
      .get("http://localhost:3001/menuCustomerView")
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
      {/* Starting hour input field */}
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
        
        {/* Ending hour input field */}
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

        {/* Dropdown */}
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

      {/* Search button */}
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



/**
 * React component:
 * Holds an search component consisting of two input field and a dropdown.
 * Shows A table consisting of pairs of menu items that sales together in a given timeframe.
 * User can additionally select a menu item to see what sold with that specific menu item in that timeframe
 * 
 */
function WhatSalesTogetherPage() {
  
  /**
   * Holds the data to show in the table. The data is fetched from the server based
   * on the search parameters
   */
  const [data, setData] = React.useState([]);

  /**
   * State used to show user that search result is currently being fetched from
   * server
   */
  const [searching, setSearching] = React.useState(false);


  /**
   * Gets the search result from the server
   * the result is an array of objects, each object has three properties:
   * item1, item2, and count
   * 
   * @param {Number} start - starting hour of the timeframe (0-23) 
   * @param {Number} end - ending hour of the timeframe (0-23)
   * @param {String} salesWith - empty string if we want to get all pairs of menu items that 
   *                            are sold in that time frame OR a menu item name if we want to
   *                            get all pairs of menu items that are sold with that specific menu item
   */
  const search = (start, end, salesWith) => {
    setSearching(true);
    setData([]);
    axios
      .get(
        `http://localhost:3001/WhatSalesTogether?start=${start}&end=${end}&salesWith=${salesWith}`
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

      {/* Set the Search UI*/}
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
                {/* Show the search result in a table */}
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
