import React, { useState } from "react";
import '../Cards/Cards.css';
import { ReactComponent as LikeIcon } from '../Assets/red_like.svg';
import { ReactComponent as DislikeIcon } from '../Assets/dislike.svg';
import HotelStars from "../Stars/Hotel-Stars";
const Cards = ({title, imgUrl, ratings, disc}) => {
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
        <HotelStars rating={ratings} />
        <p>{disc}</p>
        <button onClick={likedData}>
            {
                liked ? (<span role="img" aria-label="Liked">❤️</span>)
                :
                (<span role="img" aria-label="Like">🤍</span>)
            }
        </button>
    </div>
      )
}


export default Cards;