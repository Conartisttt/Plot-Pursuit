import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import SingleBook from './pages/SingleBook';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import Library from './pages/Library';
import Search from './pages/Search';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/Login',
        element: <Login />
      }, {
        path: '/Signup',
        element: <Signup />
      }, {
        path: '/Library/:bookId',
        element: <SingleBook />
      }, {
        path: '/Library',
        element: <Library/>
      }, {
        path: '/search',
        element: <Search />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
