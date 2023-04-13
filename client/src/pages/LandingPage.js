import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
export default function LandingPage() {
    return (
      <div id="error-page">
        <h1>This is a WIP landing page</h1>
        <Button variant="contained" component = {Link} to="/RestockReportPage">Restock Report Page</Button>
      </div>
    );
  }