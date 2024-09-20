import React from 'react';
import { useRouteError } from 'react-router-dom'; //this allows you to access any error that occurred during the loading or rendering of a route.
import { Link } from 'react-router-dom'; 

const ErrorPage = () => {
  useRouteError(); // Get the error from the router

  return (
    <div>
      <h1>Oops! Page not found.</h1>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">Go Back Home</Link> {/* It is best to use Link instead of A tag because A tag refreshes the page when clicked and Link does not refresh the page when user clicks on it */}
    </div>
  );
};

export default ErrorPage;