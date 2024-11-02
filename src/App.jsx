import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MenuEditor from './components/MenuEditor';
import Home from './components/HOME';
import Footer from './components/footer';
import Header from './components/header';





const App = () => {
  return (
    <Router>
       <Header />
      <div>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/editor" element={<MenuEditor />} />

        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
