import MenuCRUDTable from '../components/MenuCRUDTable.js';
import React from 'react';

import { styled, ThemeProvider, createTheme, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MainAppBar from '../components/MainAppBar.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
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

// The grid max xs = 12
function ChangeMenuPage() {
  return (
    <ThemeProvider theme={cfa_theme}>
    <div className="ChangeMenuPage">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <MainAppBar>
            </MainAppBar>
          </Grid>

          <Grid xs={12}>
            <Item>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Manager Change Menu Table
            </Typography>
            </Item>
          </Grid>

          <Grid xs={12}>
            <Item>
              <MenuCRUDTable />
            </Item>
          </Grid>
        </Grid>
    </div>
    </ThemeProvider>
  );
}

export default ChangeMenuPage;
