function dinhDangSo(x: number){
    if(isNaN(x)){
        return 0;
    }

    //Sử dụng hàm toLocaleString để định dạng
    return x.toLocaleString("vi-VN");
}

export default dinhDangSo;