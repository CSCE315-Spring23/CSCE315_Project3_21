import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';


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
        <MenuItem onClick={() => navigate("/RestockReportPage")}>
          Restock Report
        </MenuItem>
        <MenuItem onClick={() => navigate("/serverPage")}>
          Server Page
        </MenuItem>
        <MenuItem onClick={()=> navigate("/WhatSalesTogetherPage")}>
          What Sells Together
        </MenuItem>
        <MenuItem onClick={()=> navigate("/ExcessReportPage")}>
          Excess Report
        </MenuItem>
        <MenuItem onClick={()=> navigate("/InventoryLevelsEndDayPage")}>
          Inventory
        </MenuItem>
        <MenuItem onClick={()=> navigate("/ChangeMenuPage")}>
          Change Menu
        </MenuItem>
        <MenuItem onClick={()=> navigate("/Customer")}>
          Customer Page
        </MenuItem>
        <MenuItem onClick={() => navigate("/SalesReport")}>
          Sales Report
          </MenuItem>
        <MenuItem onClick = {() => navigate("/XZReportPage")}>
          Z and X Reports
          </MenuItem>
        <MenuItem onClick = {() => navigate("/MenuBoard")}>
          Menu Board
        </MenuItem>
      </Menu>
    </div>
  );
}
