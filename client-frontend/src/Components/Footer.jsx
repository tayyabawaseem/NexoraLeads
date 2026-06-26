import "../App.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="logo">
          Nexora<span>Leads</span>
        </span>
      </div>

      <div className="footer-center">
        <p>© 2025 NexoraLeads. All rights reserved.</p>
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