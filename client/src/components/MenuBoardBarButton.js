import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * AppBarMenuButton function is used to created the navigation between the server side web pages. 
 * 
 * 
 */
export default function AppBarMenuButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
/**
 * 
 * returns the nav bar with proper navigation to the customer page, menu board, and server page.
 * 
 * 
 */
  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >      
        <MenuItem onClick={()=> navigate("/Customer")}>
          Create An Order
        </MenuItem>
        <MenuItem onClick={() => navigate("/MenuBoard")}>
          Menu Board
        </MenuItem> 
      </Menu>
    </div>
  );
}
