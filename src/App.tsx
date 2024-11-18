import React, { useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';

function App() {
  //Tạo biến từ khóa tìm kiếm để truyền cho trang con
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  return (
    <div>
      <Navbar setTuKhoaTimKiem={setTuKhoaTimKiem}/> {/* Truyền qua cho Navbar để nó set dữ liệu khi người dùng nhập vào */}
      <HomePage tuKhoaTimKiem={tuKhoaTimKiem}/> {/*Truyền qua cho Homepage để nó truyền cho DanhSachSanPham*/}
      <Footer/>
    </div>
  );
}

export default App;
