import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
// import logoSvg from '../../assets/mvs2.svg';
import './Navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        {/* <img src={logoSvg} alt="Movie VS" className='logo-svg'/> */}
      </div>
      <div className="navbar__buttons">
        {isAuthenticated && (
          <button className="navbar__button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
