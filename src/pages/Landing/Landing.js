import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import './Landing.scss';

const Landing = () => {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
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

  return (
    <div className="landing">
      <div className="landing__content">
        <h1>Welcome to Movie VS</h1>
        <p>Your ultimate platform for building your top 20 movies</p>
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
        <form className="auth-form">
          <div className="form-group">
            <label>
              Email 
              {touchedFields.loginEmail && <span className="required">*</span>}
            </label>
            <input 
              type="email" 
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
        <form className="auth-form">
          <div className="form-group">
            <label>
              Email
              {touchedFields.registerEmail && <span className="required">*</span>}
            </label>
            <input 
              type="email" 
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
