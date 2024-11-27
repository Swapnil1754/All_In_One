import React, { useEffect, useState } from "react";
import './Header.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginToken, updateUser, updateIsOwner } from "../../Redux/actions";
import Notify from "./Notify";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [x, setX] = useState(false);
  const [isOwner, setIsowner] = useState(false);
  const xD = useSelector((state) => state.loginToken);
  const pX = useSelector((state) => state.isOwner);
  const dispatch = useDispatch();
  const [cityQuery, setCityQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const cityUrl = process.env.REACT_APP_SEARCH_CITIES;
  useEffect(() => {
    if (xD !== 900) {
      setX(true);
    }
    if (pX) {
      setIsowner(true);
    }
  }, [xD, pX]);

  const handleButton = () => {
    dispatch(updateLoginToken(900));
    dispatch(updateIsOwner(false));
    dispatch(updateUser(null));
    localStorage.removeItem("Token");
    setX(false);
  };

  const toggleOption = () => {
    setShowOptions(!showOptions);
  };

  const ownerProfile = () => {
    navigate("/owner-display");
    setShowOptions(!showOptions);
  };

  // Debounce the search to reduce excessive API calls
  useEffect(() => {
    const debounceData = setTimeout(() => {
      if (cityQuery) {
        fetchCities(cityQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounceData);
  }, [cityQuery]);

  // Fetch cities from backend API
  const fetchCities = async (searchCity) => {
    setLoading(true);
    try {
      const response = await fetch(`${cityUrl}/${searchCity}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  // Include credentials if authentication is required
      });
      const data = await response.json();
      setSuggestions(data);  // Use an empty array if data is null or undefined
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };
  // To get city Data
  const renderCityData = (e) => {
    localStorage.removeItem("cityName");
    localStorage.setItem("cityName", e.cityName);
    // setCityQuery("");
    navigate("/city-hotels");
  }

  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li><a href="/" className="header-logo">AllInOne.com</a></li>

          {/* Search Container */}
          <div className="search-container">
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              placeholder="Search for a City..."
              aria-label="City search"
            />
            {suggestions.length > 0 && (
              <ul className="search-suggestions">
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => renderCityData(city)}>
                  <strong>{city.cityName}</strong>, {city.state} - {city.nation}
                </li>
              ))}
            </ul>
            )}
          </div>

          {/* Notification and Menu Options */}
          <li className="notification-icon">
            <Notify />
          </li>
          <div className={`menu ${showOptions ? "active" : ""}`}>
            <div className="menu-icon" onClick={toggleOption}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            {showOptions && (
              <ul className="menu-options">
                {isOwner ? (
                  <li><a href="#" onClick={ownerProfile}>Profile</a></li>
                ) : (
                  <li>Profile</li>
                )}
                <li>Settings</li>
                {x ? (
                  <li><a href="#" onClick={handleButton}>LogOut</a></li>
                ) : (
                  <li><a href="/login">Login</a></li>
                )}
              </ul>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
