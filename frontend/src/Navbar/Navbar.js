import React from "react";
import "../Navbar/Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar w-100 p-3 pt-md-4">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#">
          <h2>Linkify</h2>
        </a>

        <button
          className="btn get-start-btn"
          onClick={() => alert("Get Started Clicked!")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};
