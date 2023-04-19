import { Button, TextField, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import Link from '@mui/material/Link';

export default function LandingPage() {
    return (

      <div id="landing-page">
        <h1>This is a WIP landing page</h1>
        <Link to ="/RestockReportPage"><button>Restock Report</button></Link>
        <Link to ="/ExcessReportPage"><button>Excess Report</button></Link>
        <Link to ="/inventoryLevelsEndDaypage"><button>Inventory Levels End Day </button></Link>
      </div>

    );
  }