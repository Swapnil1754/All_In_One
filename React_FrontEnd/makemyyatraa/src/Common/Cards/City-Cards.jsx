// CityCards.jsx

import React, { useState } from "react";
import '../Cards/Cards.css';
import { ReactComponent as LikeIcon } from '../Assets/red_like.svg';
import { ReactComponent as DislikeIcon } from '../Assets/dislike.svg';

const CityCards = ({ title, imgUrl, disc }) => {
    const [liked, setLiked] = useState(false);

    // Decode base64 image data
    const decodeBase64Image = (base64String) => {
        const binaryData = atob(base64String);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }
        return URL.createObjectURL(new Blob([uint8Array]));
    };

    // Use the decoded image URL
    const decodedImgUrl = decodeBase64Image(imgUrl);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    return (
        <div className="city-card">
            <img src={decodedImgUrl} alt={title} className="city-card-image" />
            <div className="city-card-content">
                <h2 className="city-card-title">{title}</h2>
                <p className="city-card-description">{disc}</p>
            </div>
        </div>
    );
};

export default CityCards;
