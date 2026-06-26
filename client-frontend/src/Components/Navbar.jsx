import { useState, useEffect, useRef } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import logo from "../assets/img/logo.png";
import WhatsAppBtn from "./WhatsAppButton/WhatsAppBtn";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop.current && currentScroll > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // body scroll lock (mobile UX fix)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar ${showNavbar ? "" : "hide-navbar"}`}>
        <div className="logo">
          <a href="">Nexora Leads</a>
          {/* <img src={logo} alt="" /> */}
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="menu-toggle" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>
          <FaXmark />
        </div>

        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

        <WhatsAppBtn />
      </div>

      {/* Overlay */}
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