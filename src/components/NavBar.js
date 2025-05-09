import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/AAF.png"
          alt="Logo"
          className="logo-image"
        />
        <span className="navbar-title">Timeslot</span>
      </div>
    </nav>
  );
};

export default NavBar;
