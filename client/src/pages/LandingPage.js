import React from 'react';
import ReactWeatherComponent from '../components/ReactWeatherComponent';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';

/**
 * Frontend implementation of the Landing Page for all users.
 * @returns Landing page component.
 */
export default function LandingPage() {
    const navigate = useNavigate();
    return (

      <div className='landing-body'>
        <div>
          <div className='CFA-logo'>        
          </div>
          <h1 className='welcome-header'>
            Welcome to Chick-Fil-A!
          </h1>
          <div className='login-buttons'>
            <Button className='customer-button'
              onClick={()=> navigate("/Customer")}>
              Customers
            </Button>
            <SignIn></SignIn>
          </div>
        </div>
        <div id="weather-component">
          <ReactWeatherComponent />
        </div>
      </div>
    );
  }