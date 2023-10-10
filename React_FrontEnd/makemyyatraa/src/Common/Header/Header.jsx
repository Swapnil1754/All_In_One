import React from "react";
import './Header.css';
const Header = () => {
    return(
        <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
    )
}
export default Header;