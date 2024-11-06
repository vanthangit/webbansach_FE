import React from "react";

function Banner(){
    return(
        <div>
            <div className="p-5 mb-4 bg-dark">
                <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                    <div>
                        <h4 className="display-5 fw-bold">
                            Đọc sách chính là hộ chiếu <br/> cho vô số cuộc phiêu lưu
                        </h4>
                        <p className="">-Mary Pope Osborne-</p>
                        <button className="btn btn-primary float-end">Khám phá ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner