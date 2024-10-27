import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Header from './components/header';
 import Footer from './components/footer';
const App = () => {
  return (
    <div className="home-container"> 
    <Router>
    <Header /> 
      <div>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" />} />  {/* Redirect / to /login */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
    </div>
  );
};

export default App;
