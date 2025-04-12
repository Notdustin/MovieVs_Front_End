import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Battle from './components/Battle/Battle';
import Footer from './components/Footer/Footer';
import Landing from './pages/Landing/Landing';
import { login } from './store/authSlice';
import './styles/App.scss';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(login(null));
    }
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
