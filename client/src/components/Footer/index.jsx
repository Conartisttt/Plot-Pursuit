import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="mt-auto"style={{ position: 'fixed', bottom: 0, left: 0, width: '100%',marginLeft:'50px'}}>
      <div className="text-left ">
        {location.pathname !== '/' && (
          <button
            className="btn mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 style={{fontSize:'15px'}}>&copy; {new Date().getFullYear()} - Plot Persuit</h4>
        <p style={{fontSize:'15px', textAlign:'left'}}>Made with readers in mind</p>
        <p style={{fontSize:'15px', textAlign:'left'}}>by:Daelyn Hiduchick,Connor Martin,and Shinayomi Ogunbayo</p>
      </div>
    </footer>
  );
};

export default Footer;
