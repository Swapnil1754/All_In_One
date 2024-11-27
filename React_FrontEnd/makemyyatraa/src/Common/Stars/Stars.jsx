import React from "react";
const Stars = ({filled}) => {
    return(
        <span style={{color: filled ? 'yellow' : 'gray'}}>
            &#9733;
        </span>
    )
}
export default Stars;