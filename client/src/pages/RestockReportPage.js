import RestockReportTable from '../components/RestockReportTable.js';
import React from 'react';

import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';

import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// The grid max xs = 12
/**
     * Function that builds the restock report page with grids and incorporates the table, app bar
     */
function RestockReportPage() {
  return (
    <div className="RestockReportPage">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MainAppBar>
            </MainAppBar>
          </Grid>

          <Grid xs={12}>
            <Item>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Restock Report Table
            </Typography>
            </Item>
          </Grid>

          <Grid xs={12}>
            <Item>
              <RestockReportTable />
            </Item>
          </Grid>

        </Grid>
    </div>
  );
}

export default RestockReportPage;
