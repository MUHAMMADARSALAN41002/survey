import React, { useState } from "react";
import "./Navbar.css";
import { MenuOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <div className="navbar-container">
      <nav className="main-nav">
        {/* logo part  */}
        <div className="logo">
          <h2> C&G - SURVEY </h2>
        </div>
      
        {/* menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/survey">Survey</NavLink>
            </li>
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <MenuOutlined style={{color:'white'}}/>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;