import React, { useState } from 'react';
import { animate } from 'animate.css';
import Modal from '../../components/Modal/Modal';
import { authService } from '../../services/authService';
import './Landing.scss';

const Landing = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [touchedFields, setTouchedFields] = useState({
    loginEmail: false,
    loginPassword: false,
    registerEmail: false,
    registerPassword: false,
    registerConfirmPassword: false
  });

  const handleBlur = (field) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login({
        email: loginData.email,
        password: loginData.password
      });
      setShowLoginModal(false);
      // Optional: Redirect or show success message
    } catch (error) {
      alert(error);
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await authService.register({
        email: registerData.email,
        password: registerData.password
      });
      setShowRegisterModal(false);
      // Optional: Show success message or redirect
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="landing">
      <div className="landing__content">
        <h1>Welcome to <div className="movie-vs-text animate__animated animate__rubberBand">Movie VS</div></h1>
        <p className="animate__animated animate__bounceInUp">Your ultimate platform for building your top 20 movies</p>
        <div className="landing__buttons">
          <button className="landing__button" onClick={() => setShowRegisterModal(true)}>
            Register
          </button>
          <button className="landing__button" onClick={() => setShowLoginModal(true)}>
            Login
          </button>
        </div>
      </div>

      <Modal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setTouchedFields(prev => ({
            ...prev,
            loginEmail: false,
            loginPassword: false
          }));
        }}
        title="Login"
      >
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>
              Email 
              {touchedFields.loginEmail && <span className="required">*</span>}
            </label>
            <input 
              type="email" 
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Enter your email" 
              required
              onBlur={() => handleBlur('loginEmail')}
              className={touchedFields.loginEmail ? 'touched' : ''}
            />
          </div>
          <div className="form-group">
            <label>
              Password
              {touchedFields.loginPassword && <span className="required">*</span>}
            </label>
            <input 
              type="password" 
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Enter your password" 
              required
              onBlur={() => handleBlur('loginPassword')}
              className={touchedFields.loginPassword ? 'touched' : ''}
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </Modal>

      <Modal
        isOpen={showRegisterModal}
        onClose={() => {
          setShowRegisterModal(false);
          setTouchedFields(prev => ({
            ...prev,
            registerEmail: false,
            registerPassword: false,
            registerConfirmPassword: false
          }));
        }}
        title="Register"
      >
        <form onSubmit={handleRegisterSubmit} className="auth-form">
          <div className="form-group">
            <label>
              Email
              {touchedFields.registerEmail && <span className="required">*</span>}
            </label>
            <input 
              type="email" 
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              placeholder="Enter your email" 
              required
              onBlur={() => handleBlur('registerEmail')}
              className={touchedFields.registerEmail ? 'touched' : ''}
            />
          </div>
          <div className="form-group">
            <label>
              Password
              {touchedFields.registerPassword && <span className="required">*</span>}
            </label>
            <input 
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              placeholder="Choose a password" 
              required
              onBlur={() => handleBlur('registerPassword')}
              className={touchedFields.registerPassword ? 'touched' : ''}
            />
          </div>
          <div className="form-group">
            <label>
              Confirm Password
              {touchedFields.registerConfirmPassword && <span className="required">*</span>}
            </label>
            <input 
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              placeholder="Confirm your password" 
              required
              onBlur={() => handleBlur('registerConfirmPassword')}
              className={touchedFields.registerConfirmPassword ? 'touched' : ''}
            />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </Modal>
    </div>
  );
};

export default Landing;
