import React from "react";

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
                name="ac"
                checked={room.aminitiesList.includes("ac")}
                onChange={() => handleAmenityChange("ac")}
              />
              Air Conditioning
            </label>
          </div>
          {/* Add more amenities as needed */}
        </div>
      </td>
    </tr>
  );
};

export default Room;
