import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/qkei_header_logo.png"

function Header() {
  return (
    <header
      className="sticky-top mb-3"
      style={{
        backgroundColor: "var(--pallette-1)",
        color: "var(--pallette-3)",
      }}
    >
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: "var(--pallette-3)" }}>
            <img src={Logo} height="30" alt="logo"></img>
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item text-center">
                <Link className="nav-link" aria-current="page" to="/" style={{ color: "var(--pallette-3)" }} >
                  <i className="bi bi-house-fill me-1"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link className="nav-link" to="/about" style={{ color: "var(--pallette-3)" }} >
                  <i className="bi bi-person-fill me-1"></i>
                  About
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link className="nav-link" to="/contact" style={{ color: "var(--pallette-3)" }} >
                  <i className="bi bi-envelope-fill me-1"></i>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
