import React from 'react';
import ReactWeatherComponent from '../components/ReactWeatherComponent';

export default function LandingPage() {
  const navigate = useNavigate();
    return (

      <div id="landing-page">
        <ReactWeatherComponent />
      </div>

    );
  }