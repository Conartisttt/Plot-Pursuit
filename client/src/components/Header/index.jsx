import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="mb-4 display-flex align-center ">
      <div className="container justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1
            className="m-0"
            style={{
              fontSize: '40px',
              fontFamily: 'IM Fell DW Pica',
              justifyContent: 'center',
            }}
          >
            Plot Persuit
          </h1>
        </Link>
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
        <div>
          {Auth.loggedIn() ? (
            <div>
              <button className="btn btn-lg m-2" onClick={logout}>
                Logout
              </button>
              <Link className="btn btn-lg m-2" to="/search">
                Search
              </Link>
              <Link className="btn btn-lg m-2" to="/library">
                Library
              </Link>
              <Link className="btn btn-lg m-2" to="/">
                Home
              </Link>
            </div>
          ) : (
            <>
              <Link className="btn btn-lg m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg m-2" to="/signup">
                Signup
              </Link>
              <Link className="btn btn-lg m-2" to="/">
                Home
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
