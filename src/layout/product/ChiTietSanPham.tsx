import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SachModel from "../../models/SachModel";
import { laySachTheoMaSach } from "../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../utils/SaoXepHang";
import dinhDangSo from "../utils/DinhDangSo";

const ChiTietSanPham: React.FC = () => {

    const {maSach} = useParams();
    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach+'');
        if(Number.isNaN(maSachNumber))
            maSachNumber=0
    } catch (error) {
        maSachNumber=0
        console.error("Error", error)
    }
    //Khai báo
    const [sach, setSach] = useState<SachModel|null>(null)
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);

    const tangSoLuong = () =>{
        const soLuongTonKho: number = (sach&&sach.soLuong?sach.soLuong:0)
        if(soLuong<soLuongTonKho){
            setSoLuong(soLuong+1);
        } 
    }

    const giamSoLuong = () =>{
        if(soLuong>=2){
            setSoLuong(soLuong-1);
        }
    }

    const handleSoLuong = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const soLuongMoi = parseInt(event.target.value);
        const soLuongTonKho: number = (sach&&sach.soLuong?sach.soLuong:0)
        if(!isNaN(soLuongMoi)&& soLuongMoi>=1 && soLuongMoi <=soLuongTonKho){
            setSoLuong(soLuongMoi);
        }
    }
    const handleMuaNgay = ()=>{

    }

    const handleThemVaoGioHang = ()=>{
        
    }

    useEffect(()=>{
        laySachTheoMaSach(maSachNumber)
        .then((sach)=>{
            setSach(sach);
            setDangTaiDuLieu(false);
        }

        )
        .catch((error)=>{
            setBaoLoi(error.message)
            setDangTaiDuLieu(false)
        }
        )
    },[maSach])

    if(dangTaiDuLieu){
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }
    if(baoLoi){
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        )
    }

    if(!sach){
        return (
            <div>
                <h1>Sách không tồn tại</h1>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                <div className="col-4">
                    <HinhAnhSanPham maSach={maSachNumber}/>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>{sach.tenSach}</h1>
                            <h4>{renderRating(sach.trungBinhXepHang?sach.trungBinhXepHang:0)}</h4>
                            <h4>{dinhDangSo(sach.giaBan?sach.giaBan:0)}đ</h4>
                            <hr />
                            <h3>Thông tin chi tiết</h3>
                            <div dangerouslySetInnerHTML={{__html:(sach.moTa+'')}}></div>
                            <hr />
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="mb-2">Số lượng</div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary me-2" onClick={giamSoLuong}>-</button>
                                    <input className="form-control text-center" type="number" value={soLuong} onChange={handleSoLuong}/>
                                    <button className="btn btn-outline-secondary ms-2" onClick={tangSoLuong}>+</button>
                                </div>
                                {
                                    sach.giaBan&&(
                                        <div className="mt-2" >
                                            Tạm tính <br />
                                            <h4>{dinhDangSo(soLuong*sach.giaBan)}đ</h4>
                                            </div>
                                    )
                                }
                                <div className="d-grid gap-2">
                                    <button className="btn btn-danger" onClick={handleMuaNgay}>Mua ngay</button>
                                    <button className="btn btn-outline-secondary" onClick={handleThemVaoGioHang}>Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <DanhGiaSanPham maSach={maSachNumber}/>
            </div>
        </div>
    );
}

export default ChiTietSanPham;
