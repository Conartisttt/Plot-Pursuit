import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#a3d092', position: 'sticky', top: '0', zIndex: '100' }}>
            <div className="container" style={{ backgroundColor: '#a3d092' }}>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{ backgroundColor: '#a3d092', borderColor: '#a3d092' }}></span>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/js/bootstrap.min.js" integrity="sha512-iJQpMvhoL7bwnRQnsiWw95p/q0jRL1R3wlqdwlAEJUVWFiAq8KzgVhBfqg8KwC2mT5k8D4h/Imi5H6Vo4pYBkg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" style={{ backgroundColor: '#a3d092' }} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" style={{ backgroundColor: '#a3d092' }} to="/Library">Library</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" style={{ backgroundColor: '#a3d092' }} to="/Login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" style={{ backgroundColor: '#a3d092' }} to="/Signup">Sign-Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Navigation