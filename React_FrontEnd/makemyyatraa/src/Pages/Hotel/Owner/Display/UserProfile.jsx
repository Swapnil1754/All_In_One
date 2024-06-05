import React from "react";
import './UserProfile.css';

const UserProfile = ({ userData }) => {
    return (
        <div className="user-data">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userData.Name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile No:</strong> {userData.mobNo}</p>
            <button className="edit-profile-button">Edit Profile</button>
        </div>
    );
};

export default UserProfile;
