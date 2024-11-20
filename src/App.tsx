import React, { useState } from 'react';
import './App.css';
import Navbar from './layout/header-footer/Navbar';
import Footer from './layout/header-footer/Footer';
import HomePage from './layout/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layout/about/About';
import ChiTietSanPham from './layout/product/ChiTietSanPham';

function App() {
  //Tạo biến từ khóa tìm kiếm để truyền cho trang con
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  return (
    <div>
      <BrowserRouter>
        <Navbar setTuKhoaTimKiem={setTuKhoaTimKiem}/> {/* Truyền qua cho Navbar để nó set dữ liệu khi người dùng nhập vào */}
        <Routes>
          <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem}/>}/>  {/*Truyền qua cho Homepage để nó truyền cho DanhSachSanPham*/}
          <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/sach/:maSach' element={<ChiTietSanPham/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
