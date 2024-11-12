import React from "react";
import './UserProfile.css';

const UserProfile = ({ userData }) => {
    if (!userData) {
        return <p>Loading user data...</p>; // Or return null, or a loading spinner, etc.
    }

    return (
        <div className="user-data">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userData.name1}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile No:</strong> {userData.mobNo}</p>
            <button className="edit-profile-button">Edit Profile</button>
        </div>
    );
};

export default UserProfile;

