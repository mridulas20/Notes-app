import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span>⚡</span> Notes App
        </div>
        
        {token && (
          <div className="nav-links">
            <button onClick={handleLogout} className="btn-danger">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
