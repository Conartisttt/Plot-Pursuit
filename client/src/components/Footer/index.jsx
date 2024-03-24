import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer
      className="mt-auto"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',

      }}
    >
      <div className="container text-left">
        {location.pathname !== '/' && (
          <button className="btn btn-sm mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4 style={{ fontSize: '12px' }}>
          &copy; {new Date().getFullYear()} - Plot Persuit Made with readers in mind           by: Daelyn Hiduchick, Connor Martin, and Shinayomi Ogunbayo
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
