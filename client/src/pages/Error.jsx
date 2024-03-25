import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    // Get the error information from the route
  const error = useRouteError();
  console.error(error); // Log the error to the console

  return (
    <div id="error-page">
        {/* Display a heading */}
      <h1>Oops!</h1>
      {/* Display a message indicating an unexpected error */}
      <p>Sorry, an unexpected error has occurred.</p>
       {/* Display the error message or status text */}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
