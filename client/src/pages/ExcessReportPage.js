import ExcessReportTable from '../components/ExcessReportTable.js';
import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';
import { TextField } from '@mui/material';

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

// The grid max xs = 12
function ExcessReportPage() {
  return (
    <div className="ExcessReportPage">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <MainAppBar>
          </MainAppBar>
        </Grid>

        <Grid xs={12}>
          <Grid>
              <TextField helperText = "Enter Start Timestamp:" id = "startTextField" label = "YYYY-MM-DD HH:MM:SS"/>
              <button>Submit</button>
          </Grid>
          <Title>
            Table including all items that have used less than 10% of their inventory in the given time
          </Title>
          <Item>
            <ExcessReportTable />
          </Item>
        </Grid>
      </Grid>

    </div>
  );
}

export default ExcessReportPage;
