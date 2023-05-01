import React from 'react';
import ReactWeatherComponent from '../components/ReactWeatherComponent';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

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
            <Button className='customer-button'
              onClick={()=> navigate("/Customer")}>
              Customers
            </Button>
            <Button className='employee-button'
              onClick={()=> navigate("/serverPage")}>
              Employees
            </Button>
        </div>
        <div id="weather-component">
          <ReactWeatherComponent />
        </div>
      </div>
    );
  }