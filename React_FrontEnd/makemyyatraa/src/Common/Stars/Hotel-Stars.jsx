
import React from "react";
import Stars from "./Stars";
const HotelStars = ({rating}) => {
    const MAX_STARS = 5;
    const roundedRating = Math.round(rating*2)/2;
    console.log("rounded", rating);
    const stars = Array.from({length: MAX_STARS }, (_,index) => index + 0.5 <= roundedRating);
    return(
        <div>
            {
                stars.map((value, index) => (
                    <Stars key={index} filled={value} />
                ))
            }
            <span style={{marginLeft: '0.5rem'}}>{rating}</span>
        </div>
    )
}
export default HotelStars;