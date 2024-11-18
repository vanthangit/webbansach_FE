import React from "react";
import SachModel from "../models/SachModel";
import my_request from "./Request";

interface KetQuaInterface {
    ketQua: SachModel[];
    tongSoSach: number;
    tongSoTrang:number;
}

async function laySach(duongDan:string): Promise<KetQuaInterface> {
    const ketQua:SachModel[] = [];

    //Gọi phương thức request
    const response = await my_request(duongDan)

    //Lấy ra json sách
    const responseData = response._embedded.saches;
    //console.log(responseData)

    //Lấy thông tin trang
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;

    for(const key in responseData){
        ketQua.push({
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach, //co the null
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang:responseData[key].trungBinhXepHang
        })
    }
    return {ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang};
}

export async function layToanBoSach(trangHienTai: number): Promise<KetQuaInterface> {
    //Xác định endpoint
    const duongDan:string = `http://localhost:8080/sach?sort=maSach,desc&size=4&page=${trangHienTai}`;

    return laySach(duongDan)
}

export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
    //Xác định endpoint
    const duongDan:string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';

    return laySach(duongDan)
}