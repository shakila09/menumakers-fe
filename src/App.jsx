import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Header from './components/header';
import Footer from './components/footer';
import TemplateFullView from './components/TemplateFullView';
import BuyTemplate from './components/BuyTemplate';
import Success from './components/Success';
import Cancel from './components/Cancel';
import MenuEditor from './components/MenuEditor';
import EditableSVG from './components/EditableSVG;
import AboutUs from './components/AboutUs';
import PurchasedTemplates from './components/PurchasedTemplates';

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
            <Route path="/home" element={<Home templates={templates} />} />
            <Route path="/template/:id" element={<TemplateFullView templates={templates} />} />
            <Route path="/Buytemplate/:id" element={<BuyTemplate templates={templates} />} />
            <Route path="/menu-editor" element={<MenuEditor />} />
            <Route path="/editable-svg/:id" element={<EditableSVG templates={templates} />} />  {/* Route for EditableSVG */}
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/purchased-templates" element={<PurchasedTemplates />} />


          </Routes>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
