import React, { useEffect, useState } from "react";
import './Header.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginToken } from "../../Redux/actions";
const Header = ({ status }) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [x, setX] = useState(false);
  const xD = useSelector((state) => state.loginToken);
  const dispatch = useDispatch();
  useEffect(() => {
    if (xD != 900) {
      setX(true)
    }
  })
  const handleButton = () => {
    dispatch(updateLoginToken(900))
    AsyncStorage.removeItem('Token');
    setX(false);
  }
  const toggleOption = () => {
    setShowOptions(!showOptions);
  }

  return (
    <header>
      <nav>
        <ul>
          <li><a href="/home" style={{ fontFamily: 'cursive' }}>AllInOne.com</a></li>
          <div className="menu">
            <div className="menu-icon" onClick={toggleOption}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            {showOptions && (
              <ul className="menu-options">
                <li>Profile</li>
                <li>Setting</li>
                {x ? (
                  <li><a href="#" onClick={handleButton}>LogOut</a></li>
                ) : (
                  <li><a href="/login">Login</a></li>
                )
                }
              </ul>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
