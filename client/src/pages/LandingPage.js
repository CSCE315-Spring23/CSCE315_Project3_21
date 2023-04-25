import { Button} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
    return (
      <div id="landing-page">
        <h1>This is a WIP landing page</h1>
        <Button onClick={() => navigate("/RestockReportPage")}>
          Restock Report
        </Button>

        <Button onClick={()=> navigate("/WhatSalesTogetherPage")}>
          What Sells Together
        </Button>
        <Button onClick={()=> navigate("/ExcessReportPage")}>
          Excess Report
        </Button>
        <Button onClick={()=> navigate("/InventoryLevelsEndDayPage")}>
          Inventory
        </Button>

      </div>
    );
  }