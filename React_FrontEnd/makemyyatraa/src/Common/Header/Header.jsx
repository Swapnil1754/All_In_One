import React, { useEffect, useState } from "react";
import './Header.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginToken } from "../../Redux/actions";
import { updateIsOwner } from '../../Redux/actions';
const Header = ({ status }) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [x, setX] = useState(false);
  const [isOwner, setIsowner] = useState(false);
  const xD = useSelector((state) => state.loginToken);
  const pX = useSelector((state) => state.isOwner);
  const dispatch = useDispatch();
  useEffect(() => {
    if (xD != 900) {
      setX(true)
    }
    if(pX) {
      setIsowner(true)
    }
  })
  const handleButton = () => {
    dispatch(updateLoginToken(900));
    dispatch(updateIsOwner(false));
    AsyncStorage.removeItem('Token');
    setX(false);
  }
  const toggleOption = () => {
    setShowOptions(!showOptions);
  }
  const ownerProfile = () => {
    navigate('/owner-display');
    setShowOptions(!showOptions);
  }

  return (
    <header>
      <nav>
        <ul>
          <li><a href="/" style={{ fontFamily: 'cursive' }}>AllInOne.com</a></li>
          {/* <li><img src="/AllInOne_logo.png" alt="" style={{height:'50px'}} /></li> */}
          <div className="menu">
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
