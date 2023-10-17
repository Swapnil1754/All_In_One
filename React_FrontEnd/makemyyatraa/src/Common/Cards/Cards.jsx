import React, { useState } from "react";
import '../Cards/Cards.css';
const Cards = ({title, imgUrl, city}) => {
const [liked, setLiked] = useState(false);
    const decodeBase64Image = (base64String) => {
        const binaryData = atob(base64String);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        return URL.createObjectURL(new Blob([uint8Array]));
      };
      const imgData = {
        imgUrl1: decodeBase64Image(imgUrl)
    }
    const likedData = () => {
        setLiked(!liked)
    }
      return(
    <div className="card">
        <img src={imgData.imgUrl1} alt={title}/>
        <h2>{title}</h2>
        <p>{city}</p>
        <button onClick={likedData}>
            {
                liked ? (<span role="img" aria-label="Liked" style={{'color':'red'}}>❤️</span>)
                :
                (<span role="img" aria-label="Like">🤍</span>)
            }
        </button>
    </div>
      )
}


export default Cards;