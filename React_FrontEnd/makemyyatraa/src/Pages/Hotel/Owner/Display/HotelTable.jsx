import React from "react";
import './HotelTable.css';

const HotelTable = ({ hotelData, editHotel }) => {
    return (
        <table className="hotel-table">
            <thead>
                <tr>
                    <th>Hotel Name</th>
                    <th>Ratings</th>
                    <th>City</th>
                    <th>Rooms</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {hotelData.map((items, index) => (
                    <tr key={index}>
                        <td>{items.hotelName}</td>
                        <td>{items.rating}</td>
                        <td>{items.city}</td>
                        <td>
                            {items.rooms && items.rooms.map((room, ind) => (
                                <ul key={ind}>
                                    <li>{room.roomCategory}</li>
                                </ul>
                            ))}
                        </td>
                        <td>
                            <button className="edit-room-button" onClick={() => editHotel(items.registrationId)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default HotelTable;
