import React, { useState } from "react";
const OwnerDisplay = () => {
    const imgUrl = "http://localhost:9000/api/hotel/room-image/5CAA622/Standard";
    const [imge, setImg] = useState();
    const imgHandle = (e) => {
        const imgData = e.target.files;
        return new Promise((resolve, reject) => {
            setImg(imgData);
            console.log("imgData", imgData);
        })
    }
    const submitImg = () => {
        const formData = new FormData();
        for(const image of imge) {
            formData.append('files', image)
        }
        try {
            const response = axios.put(imgUrl, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            console.log("Success");
        } catch(error) {
            console.log("err", error)
        }
    }
return(
    <div>
         <div>
        <input type="file" multiple onChange={(e) => imgHandle(e)} />
      </div>
    </div>
)
}
export default OwnerDisplay;