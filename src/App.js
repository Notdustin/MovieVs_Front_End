import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Battle from './components/Battle/Battle';
import Footer from './components/Footer/Footer';
import Landing from './pages/Landing/Landing';
import './styles/App.scss';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


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
