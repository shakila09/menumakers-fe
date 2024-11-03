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
import Footer from './components/footer';
 import TemplateFullView from './components/TemplateFullView';
 import BuyTemplate from './components/BuyTemplate';
 import Success from './components/Success';
import Cancel from './components/Cancel';


const App = () => {
  // Dynamically import all SVG files from Free and Premium folders
  const freeTemplates = import.meta.glob('/src/templates/Free/*.svg', { eager: true });
  const premiumTemplates = import.meta.glob('/src/templates/Premium/*.svg', { eager: true });

  // Map each file to an object with `id`, `src`, and `category`
  const templates = [
    ...Object.entries(freeTemplates).map(([filePath, module]) => ({
      id: filePath.split('/').pop().replace('.svg', ''),
      src: module.default,
      category: 'Free',
      description: 'A simple and free template for quick designs.',
    })),
    ...Object.entries(premiumTemplates).map(([filePath, module]) => ({
      id: filePath.split('/').pop().replace('.svg', ''),
      src: module.default,
      category: 'Premium',
      price: '9.99 $',
      description: 'A premium template with more customizable options.',
    })),
  ];

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


          <Route path="/home" element={<Home templates={templates} />} />
          <Route path="/template/:id" element={<TemplateFullView templates={templates} />} />
          <Route path="/Buytemplate/:id" element={<BuyTemplate templates={templates} />} />
          <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;

