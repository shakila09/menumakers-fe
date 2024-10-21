import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Header from './components/header';
 import Footer from './components/footer';

const App = () => {
  return (
    <div className="home-container"> 
   
    <Router>
    <Header /> 
      {/* <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/forgotpassword">Forgot</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
      </Routes>
      <Footer /> 
    </Router>
   
    </div>
  );
};

export default App;
