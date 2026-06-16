import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/img/logo-removebg-preview.png";
import WhatsAppBtn from "./WhatsAppButton/WhatsappBtn";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop && currentScroll > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`navbar ${showNavbar ? "" : "hide-navbar"}`}>
        <div className="logo">
          <img
            src={logo}
            alt="logo"
          />
        </div>

        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>
        <div
          className="close-btn"
          onClick={() => setMenuOpen(false)}
        >
            <FaTimes />
        </div>

        <a href="/" onClick={() => setMenuOpen(false)}>
          Home
        </a>

        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>

        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>

        <WhatsAppBtn  />
      </div>

      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Navbar;