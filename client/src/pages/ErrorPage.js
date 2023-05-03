import { useRouteError } from "react-router-dom";
import React from 'react';
/**
     * The Error Page function builds the error page that shows up when there is an issue with the javascript
     */
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      import MenuBoardBar from '../components/MenuBoardBar.js';
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}