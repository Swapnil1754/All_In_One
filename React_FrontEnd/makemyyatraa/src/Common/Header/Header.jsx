import React, { useEffect, useState } from "react";
import './Header.css';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginToken, updateUser, updateIsOwner } from "../../Redux/actions";
import Notify from "./Notify";
import { useAuth } from "../../AuthProvider";

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
  const { logout } = useAuth();
  const [isListening, setIsListening] = useState(false);

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
    logout();
  };

  const toggleOption = () => {
    setShowOptions(!showOptions);
  };

  const ownerProfile = () => {
    navigate("/owner-display");
    setShowOptions(!showOptions);
  };

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

  const fetchCities = async (searchCity) => {
    setLoading(true);
    try {
      const response = await fetch(`${cityUrl}/${searchCity}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderCityData = (e) => {
    localStorage.removeItem("cityName");
    localStorage.setItem("cityName", e.cityName);
    navigate("/city-hotels");
  };

  const startSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCityQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="header-nav-list">
          <li><a href="/" className="header-logo">AllInOne.com</a></li>

          {/* Search Container */}
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                placeholder="Search for a City..."
                aria-label="City search"
              />
              <span
                className="microphone-icon"
                onClick={startSpeechToText}
                aria-label="Activate speech recognition"
                title={isListening ? "Listening..." : "Click to Speak"}
              >
                🎤
              </span>
            </div>
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
