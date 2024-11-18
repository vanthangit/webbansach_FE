import React, { useEffect, useState } from "react";
import SachModel from "../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach, timKiemSach } from "../../api/SachAPI";
import { PhanTrang } from "../utils/PhanTrang";

//Nhận vào từ khóa và xử lý tìm kiếm bằng cách gọi lại hàm bên API
interface DanhSachSanPhamProps{
    tuKhoaTimKiem: string
}

function DanhSachSanPham({tuKhoaTimKiem}: DanhSachSanPhamProps){
    
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    useEffect(()=>{
        if(tuKhoaTimKiem===''){
        layToanBoSach(trangHienTai-1).then(
            result =>{
                setDanhSachQuyenSach(result.ketQua);
                setTongSoTrang(result.tongSoTrang)
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
            }
        );
        }else{
            timKiemSach(tuKhoaTimKiem).then(
                result =>{
                    setDanhSachQuyenSach(result.ketQua);
                    setTongSoTrang(result.tongSoTrang)
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setBaoLoi(error.message);
                }
            );
        }
    },[trangHienTai, tuKhoaTimKiem] //Chỉ gọi một lần
    )

    const phanTrang=(trang: number) =>{
        setTrangHienTai(trang);
    }

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
    if(danhSachQuyenSach.length===0){
        return(
            <div className="container">
            <div className="row mt-4 mb-4">
                <h3>Không tìm thấy sách theo yêu cầu!</h3>
            </div>
        </div>
        );
    }
    return(
        <div className="container">
            <div className="row mt-4 mb-4">
                {
                    danhSachQuyenSach.map((sach)=>(
                        <SachProps key={sach.maSach} sach={sach}/>
                    ))
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </div>
    );
}

export default DanhSachSanPham