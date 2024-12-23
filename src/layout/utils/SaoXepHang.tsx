import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const renderRating=(diem:number)=>{
    const stars = [];
    for(let i =1; i<=5; i++){
        if(i<=diem){
            stars.push(<StarFill className="text-warning"/>)
        }else if(i>diem && diem>(i-1)){
            stars.push(<StarHalf className="text-warning"/>)
        }else{
            stars.push(<Star className="text-warning"/>)
        }
    }
    return stars
}

export default renderRating;