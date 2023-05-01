import React from 'react';
import ReactWeatherComponent from '../components/ReactWeatherComponent';

export default function LandingPage() {
    return (

      <div className='landing-body'>
        <div>
          <div className='CFA-logo'>        
          </div>
          <h1 className='welcome-header'>
            Welcome to Chick-Fil-A!
          </h1>
          <a href='http://localhost:3000/Customer'>
            <button className='customer-button'>
              Customers
            </button>
          </a>
          <a href='http://localhost:3000/serverPage'>
            <button className='employee-button'>
              Employees
            </button>
          </a>
        </div>
        <div id="weather-component">
          <ReactWeatherComponent />
        </div>
      </div>
    );
  }