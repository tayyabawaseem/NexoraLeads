import { FaWhatsapp } from "react-icons/fa";
import "../../App.css"

function WhatsAppBtn({
  text = "Get Leads on WhatsApp",
  link = "https://chat.whatsapp.com/FJy807kh0Lf7krDc7L6ttv?mode=ac_t"
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
    >
      <FaWhatsapp className="whatsapp-icon" style={{ fontSize: "21px" }} />
      <span>{text}</span>
    </a>
  );
}

export default WhatsAppBtn;