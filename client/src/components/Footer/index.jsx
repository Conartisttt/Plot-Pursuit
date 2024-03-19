import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto p-4"style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', paddingTop:10,}}>
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>&copy; {new Date().getFullYear()} - Tech Friends</h4>
      </div>
    </footer>
  );
};

export default Footer;
