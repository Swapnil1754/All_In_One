import React, { useEffect, useState } from "react";
import './Header.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from "react-router-dom";

const Header = ({ status }) => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [x, setX] = useState(false);
  useEffect(() => {
    const logData = async () => {
    const data0 = await AsyncStorage.getItem('Token');
    if(data0){
      setX(true);
    }else{
      setX(false);
    }
  }
  const logOut = () => {
    setX(false);
    navigate('/login');
  }
  if(x) {
    logOut();
  } else {
    logData();
  }
  }, [status]);
  const handleButton = () => {
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
                  <li><a href="" onClick={handleButton}>LogOut</a></li>
                ):(
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
