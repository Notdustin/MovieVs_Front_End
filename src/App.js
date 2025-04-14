import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Battle from './components/Battle/Battle';
import Footer from './components/Footer/Footer';
import Landing from './pages/Landing/Landing';
import { login, logout } from './store/authSlice';
import { authService } from './services/authService';
import './styles/App.scss';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      dispatch(login(user));
    }

    // Setup auto-logout timer
    let logoutTimer;
    const resetLogoutTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        dispatch(logout());
        authService.logout();
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Reset timer on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleUserActivity = () => resetLogoutTimer();

    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Initial timer setup
    if (user) resetLogoutTimer();

    // Cleanup
    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [dispatch]);

  console.log("Are we changing?",isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/battle" />
            ) : (
              <Landing />
            )
          }
        />
        <Route
          path="/battle"
          element={
            isAuthenticated ? (
              <div className="app">
                <Navbar />
                <div className="main-content">
                  <Sidebar />
                  <Battle />
                </div>
                <Footer />
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Catch all route for 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
