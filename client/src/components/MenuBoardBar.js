import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { UserAuth } from '../login/AuthContext';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import MenuBoardBarButton from './MenuBoardBarButton';
/**
 * 
 * cfa_theme used to create the theme of the menu board app bar
 * 
 * 
 */
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
/**
 * 
 * MenuBoardBar function is used to generate the app bar of the menu board
 * 
 * 
 */
export default function MenuBoardBar() {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
/**
 * 
 * returns the menu board bar with all of the necessary features. 
 * 
 * 
 */
  return (
    <ThemeProvider theme={cfa_theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <Typography id='bar-description' variant= "h4" padding = "10px" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              CFA Customer Kiosk
            </Typography>
            <Button onClick={handleSignOut} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}