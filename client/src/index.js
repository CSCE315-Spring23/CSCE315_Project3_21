import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RestockReportPage from './pages/RestockReportPage';
import ExcessReportPage from './pages/ExcessReportPage';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import WhatSalesTogether from './pages/WhatSalesTogether';
import InventoryLevelsEndDayPage from './pages/inventoryLevelsEndDayPage';
import LoginPage from './pages/LoginPage';
import { AuthContextProvider } from './login/AuthContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/RestockReportPage",
    element: <RestockReportPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/WhatSalesTogether",
    element: <WhatSalesTogether />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ExcessReportPage",
    element: <ExcessReportPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/InventoryLevelsEndDayPage",
    element: <InventoryLevelsEndDayPage />,
    errorElement:<ErrorPage />
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
