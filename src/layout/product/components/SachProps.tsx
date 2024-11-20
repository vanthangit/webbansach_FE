import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhAPI";
import { Link } from "react-router-dom";
import renderRating from "../../utils/SaoXepHang";
import dinhDangSo from "../../utils/DinhDangSo";

interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {

    const maSach: number = props.sach.maSach;

    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(()=>{
        lay1AnhCuaMotSach(maSach).then(
            hinhAnhData =>{
                setDanhSachAnh(hinhAnhData);
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
    let duLieuAnh:string="";
    if(danhSachAnh[0] && danhSachAnh[0].duLieuAnh){
        duLieuAnh=danhSachAnh[0].duLieuAnh;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card h-100">
                <Link to={`/sach/${props.sach.maSach}`}>
                    <img
                        src={duLieuAnh}
                        className="card-img-top"
                        alt={props.sach.tenSach}
                        style={{ 
                            width: '100%', 
                            height: '300px', 
                            objectFit: 'cover', 
                            borderTopLeftRadius: '8px', 
                            borderTopRightRadius: '8px'
                        }}
                    />
                </Link>
                <div className="card-body d-flex flex-column">
                <Link to={`/sach/${props.sach.maSach}`} style={{textDecoration: `none`}}>
                    <h5 className="card-title">{props.sach.tenSach}</h5>
                </Link>
                    <div className="price mt-auto row">
                        <span className="original-price mr-2 col-6">
                            <del>{dinhDangSo(props.sach.giaNiemYet?props.sach.giaNiemYet:0)}đ</del>
                        </span>
                        <span className="discounted-price col-6">
                            <strong>{dinhDangSo(props.sach.giaBan?props.sach.giaBan:0)}đ</strong>
                        </span>
                    </div>
                    <div className="row mt-3" role="group">
                        <div className="col-6">
                            {renderRating(props.sach.trungBinhXepHang?props.sach.trungBinhXepHang:0)}
                        </div>
                        <div className="col-6 text-end">
                            <button className="btn btn-secondary btn-block me-2" title="Add to Wishlist">
                                <i className="fas fa-heart"></i>
                            </button>
                            <button className="btn btn-danger btn-block " title="Add to Cart">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SachProps;
