import React, { useEffect, useState } from "react";
import DanhGiaModel from "../../../models/DanhGiaModel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import renderRating from "../../utils/SaoXepHang";

interface DanhGiaSanPham {
    maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {

    const maSach: number = props.maSach;

    
    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(()=>{
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSach =>{
                setDanhSachDanhGia(danhSach);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setBaoLoi(error.message);
            }
        )
    },[] //Chỉ gọi một lần
    )

    

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

    return (
        <div className="container mt-2 mb-2">
            <h3>Đánh giá sản phẩm: </h3>
            {
                danhSachDanhGia.map((danhGia, index)=>(
                    <div className="row">
                        <div className="col-4 text-end">
                            <p>{renderRating(danhGia.diemXepHang?danhGia.diemXepHang:0)}</p>
                        </div>
                        <div className="col-8">
                            <p>{danhGia.nhanXet}</p>
                        </div>
                    </div>
                ))
            }
            
        </div>
    );
};

export default DanhGiaSanPham;
