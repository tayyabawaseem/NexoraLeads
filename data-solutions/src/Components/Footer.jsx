import "../App.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="logo">
          Data<span>Solutions</span>
        </span>
      </div>

      <div className="footer-center">
        <p>© 2025 DataSolutions. All rights reserved.</p>
      </div>

      <div className="footer-right nav-links">
        <a href="#contact">Contact</a>
        <a href="#">Terms</a>
        <a href="#">Privacy Policy</a>
      </div>
    </footer>
  );
}

export default Footer;