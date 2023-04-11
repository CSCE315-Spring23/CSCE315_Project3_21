import React from 'react';
import {Link} from "react-router-dom";
export default function LandingPage() {
    return (
      <div id="error-page">
        <h1>This is a WIP landing page</h1>
        <Link to ="/ExcessReportPage"><button>Go to Page 2</button></Link>
      </div>
    );
  }