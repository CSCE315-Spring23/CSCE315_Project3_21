import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RestockReportPage from './pages/RestockReportPage';
import ExcessReportPage from './pages/ExcessReportPage';
import ErrorPage from './pages/ErrorPage';
import WhatSalesTogetherPage from './pages/WhatSalesTogetherPage';

import LoginPage from './pages/LoginPage';
import ServerPage from './pages/ServerPage';
import CustomerPage from './pages/CustomerPage';
import InventoryLevelsEndDayPage from './pages/InventoryLevelsEndDayPage';
import ChangeMenuPage from './pages/ChangeMenuPage'
import XZReportPage from './pages/XZReportPage';
import MenuBoard from './pages/MenuBoard.js';
import SalesReportPage from './pages/SalesReportPage.js';
import { AuthContextProvider } from './login/AuthContext';
import TestTranslatePage from './pages/TestTranslatePage.js';

import GoogleTranslateButton from './components/GoogleTranslateButton';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/LoginPage",
    element: <LoginPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/RestockReportPage",
    element: <RestockReportPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/WhatSalesTogetherPage",
    element: <WhatSalesTogetherPage />,
    errorElement: <ErrorPage/>
  },
  
  {
    path: "/ServerPage",
    element: <ServerPage/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Customer",
    element: <CustomerPage/>,
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
    errorElement:<ErrorPage />,
  },
  {
    path: "/ChangeMenuPage",
    element: <ChangeMenuPage />,
    errorElement:<ErrorPage />,
  },
  {
    path: "/XZReportPage",
    element: <XZReportPage />,
    errorElement:<ErrorPage />
  },
  {
    path: "/MenuBoard",
    element: <MenuBoard/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/TestTranslatePage",
    element: <TestTranslatePage />,
    errorElement:<ErrorPage />
  },

  {
    path: "/SalesReport",
    element: <SalesReportPage/>,
    errorElement: <ErrorPage/>,
  },
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <GoogleTranslateButton />
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </div>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
