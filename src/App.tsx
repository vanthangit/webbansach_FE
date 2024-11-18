import React from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';

function App() {
  return (
    <div>
      <Navbar/>
      <HomePage/>
      <Footer/>
    </div>
  );
}

export default App;
