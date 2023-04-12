import RestockReportTable from '../components/RestockReportTable.js';
import React from 'react';

import { styled } from '@mui/material/styles';
//import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// The grid max xs = 12
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
            <RestockReportTable />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>Placeholder 1 w/ xs=6</Item>
        </Grid>
        <Grid xs={6}>
          <Item>Placeholder 2 w/ xs=6</Item>
        </Grid>
      </Grid>

    </div>
  );
}

export default RestockReportPage;