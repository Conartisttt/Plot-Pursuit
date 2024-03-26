import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { useState } from 'react';

const Header = () => {
   // State to manage the visibility of the dropdown menu
  const [showMenu, setShowMenu] = useState(false);

// Function to toggle the visibility of the dropdown menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

   // Function to handle user logout
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="mb-4 display-flex align-center justify-content">
      <div className="container text-center align-center justify-content">
         {/* Logo and title */}
        <Link className="text-dark" to="/">
          <h1
            className="m-0"
            style={{
              fontSize: '40px',
              fontFamily: 'IM Fell DW Pica',
              justifyContent: 'center',
            }}
          >
            Plot Pursuit
          </h1>
        </Link>
         {/* Subtitle */}
        <p
          className="m-0"
          style={{
            fontSize: '20px',
            fontWeight: '700',
            fontFamily: 'IM Fell DW Pica',
          }}
        >
          Library and TBR Tracker.
        </p>
        {/* Main navigation buttons */}
        <div className="buttons-container align-center justify-content">
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg m-2" to="/search">
                Search
              </Link>
              <Link className="btn btn-lg m-2" to="/library">
                Library
              </Link>
              <Link className="btn btn-lg m-2" to="/">
                Home
              </Link>
              <button className="btn btn-lg m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg m-2" to="/">
                Home
              </Link>            
              <Link className="btn btn-lg m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
        {/* Show menu button on smaller screens */}
        <div className="menu-container">
          <button className="btn btn-menu" onClick={toggleMenu}>
            Menu
          </button>
          {/* Show dropdown menu on smaller screens */}
          {showMenu && (
            <div className="dropdown-menu">
              {Auth.loggedIn() ? (
                <>
                  <button className="btn btn-lg m-2" onClick={logout}>
                    Logout
                  </button>
                  <Link className="btn btn-lg m-2" to="/search">
                    Search
                  </Link>
                  <Link className="btn btn-lg m-2" to="/">
                Home
              </Link>
                  <Link className="btn btn-lg m-2" to="/library">
                    Library
                  </Link>
                </>
              ) : (
                <>
              <Link className="btn btn-lg m-2" to="/">
                Home
              </Link>
                  <Link className="btn btn-lg m-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-lg m-2" to="/signup">
                    Signup
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;