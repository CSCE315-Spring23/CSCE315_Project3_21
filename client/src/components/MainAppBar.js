import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBarMenuButton from './AppBarMenuButton';

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

export default function MainAppBar() {
  return (
    <ThemeProvider theme={cfa_theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <AppBarMenuButton />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Chick-fil-A POS
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}