import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto"style={{ position: 'fixed', bottom: 0, left: 0, width: '100%',}}>
      <div className="container text-left ">
        {location.pathname !== '/' && (
          <button
            className="btn mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 style={{fontSize:'15px'}}>&copy; {new Date().getFullYear()} - Plot Persuit</h4>
        <p style={{fontSize:'10px', textAlign:'left'}}>Made with readers in mind</p>
        <p style={{fontSize:'10px', textAlign:'left'}}>by:Daelyn Hiduchick,Connor Martin,and Shinayomi Ogunbayo</p>
      </div>
    </footer>
  );
};

export default Footer;
