import React from "react";
import my_request from "./Request";
import DanhGiaModel from "../models/DanhGiaModel";

export async function layDanhGiaCuaMotSach(duongDan: string): Promise<DanhGiaModel[]> {
    const ketQua:DanhGiaModel[] = [];
    //Gọi phương thức request
    const response = await my_request(duongDan)

    //Lấy ra json sách
    const responseData = response._embedded.suDanhGias;
    //console.log(responseData)


    for(const key in responseData){
        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet
        })
    }
    return ketQua;
}

export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {
    //Xác định endpoint
    const duongDan:string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia`;

    return layDanhGiaCuaMotSach(duongDan);
}

export async function lay1DanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {
    //Xác định endpoint
    const duongDan:string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia?sort=maDanhGia.asc&page=0&size=1`;

    return layDanhGiaCuaMotSach(duongDan);
}