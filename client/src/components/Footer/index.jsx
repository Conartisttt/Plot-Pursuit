import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto p-4"style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', paddingTop:10,}}>
      <div className="container text-center mb-5 footer">
        {location.pathname !== '/' && (
          <button
            className="btn mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 style={{fontSize:'20px'}}>&copy; {new Date().getFullYear()} - Plot Persuit</h4>
        <p style={{fontSize:'15px'}}>Made with readers in mind by: Daelyn Hiduchick, Connor Martin</p>
      </div>
    </footer>
  );
};

export default Footer;
