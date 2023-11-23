import axios from "axios";
import React, { useState } from "react";

const Room = ({ room, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...room, [name]: value });
  };

  const handleAmenityChange = (selectedAmenity) => {
    const updatedAmenities = room.aminitiesList.includes(selectedAmenity)
      ? room.aminitiesList.filter((amenity) => amenity !== selectedAmenity)
      : [...room.aminitiesList, selectedAmenity];

    onChange({ ...room, aminitiesList: updatedAmenities });
  };
  const [imge, setImg] = useState();
  const imgUrl ="";
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

  return (
    <tr>
      <td>
        <input
          type="text"
          name="roomCatagory"
          placeholder="Room Category"
          value={room.roomCatagory}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="roomType"
          placeholder="Room Type"
          value={room.roomType}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="price"
          placeholder="Room Price"
          value={room.price}
          onChange={handleChange}
        />
      </td>
      <td>
        <div>
          <div>
            <label>
              <input
                type="checkbox"
                name="wifi"
                checked={room.aminitiesList.includes("wifi")}
                onChange={() => handleAmenityChange("wifi")}
              />
              Wi-Fi
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="tv"
                checked={room.aminitiesList.includes("tv")}
                onChange={() => handleAmenityChange("tv")}
              />
              TV
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="swimming pool"
                checked={room.aminitiesList.includes("swimming pool")}
                onChange={() => handleAmenityChange("swimming pool")}
              />
              Swimming Pool
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="breakfast"
                checked={room.aminitiesList.includes("breakfast")}
                onChange={() => handleAmenityChange("breakfast")}
              />
              Morning Breakfast
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="dinner"
                checked={room.aminitiesList.includes("dinner")}
                onChange={() => handleAmenityChange("dinner")}
              />
              Dinner
            </label>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Room;
