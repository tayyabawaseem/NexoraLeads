import WhatsAppBtn from "./WhatsAppButton/WhatsappBtn";
import { FaCheck, FaWhatsapp } from "react-icons/fa";
import {
  FaBuilding,
  FaCity,
  FaLocationDot,
  FaRegGem,
  FaTowerObservation,
  FaHouseFlag,
  FaHotel,
  FaUserLock,
  FaUserCheck,
  FaArrowsRotate,
} from "react-icons/fa6";

import "../App.css";
import heroImg from "../assets/img/Hero.jpg";
import Footer from "./Footer";

const WHATSAPP_LINK =
  "https://wa.me/923702676815?text=Hello%20I%20want%20qualified%20off-plan%20leads";

const features = [
  "Multi-channel demand generation across high-intent platforms",
  "Strict qualification framework based on budget and purchase intent",
  "Dedicated campaign systems for new UAE off-plan project launches",
];

const cities = [
  {
    icon: <FaCity />,
    title: "Dubai",
    description:
      "High-demand investor leads from Dubai's premium off-plan developments.",
  },
  {
    icon: <FaTowerObservation />,
    title: "Abu Dhabi",
    description:
      "Verified buyers interested in Abu Dhabi's luxury property market.",
  },
  {
    icon: <FaHouseFlag />,
    title: "Sharjah",
    description:
      "Growing investor demand for affordable community developments.",
  },
  {
    icon: <FaHotel />,
    title: "Ras Al Khaimah (RAK)",
    description:
      "High-intent investors targeting upcoming RAK projects.",
  },
];

const locations = [
  {
    icon: <FaBuilding />,
    title: "Dubai",
    desc: "Exclusive off-plan investor leads for Dubai's most in-demand and high-growth developments.",
  },
  {
    icon: <FaCity />,
    title: "Abu Dhabi",
    desc: "Verified, project-specific buyers engaging in Abu Dhabi's premium launch market.",
  },
  {
    icon: <FaLocationDot />,
    title: "Sharjah",
    desc: "Emerging investor demand from cost-driven buyers and new off-plan community developments.",
  },
  {
    icon: <FaRegGem />,
    title: "Ras Al Khaimah (RAK)",
    desc: "High-intent buyers targeting early-stage investment opportunities in RAK projects.",
  },
];

const cards = [
  {
    icon: <FaUserLock />,
    title: "Exclusive Lead Allocation",
    text: "Each lead is assigned to one broker only — ensuring no competition, higher engagement, and better closing potential.",
  },
  {
    icon: <FaUserCheck />,
    title: "Pre-Qualified Buyer Verification",
    text: "All leads are screened through a structured verification process by our team to ensure genuine interest and buying intent.",
    active: true,
  },
  {
    icon: <FaArrowsRotate />,
    title: "Replacement Assurance System",
    text: "If a lead does not respond or meets quality issues, it is replaced with a fresh verified lead at no additional cost.",
  },
];

function HeroSection() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroImg})`,
        }}
      >
        <h1>
          Close More <span>Dubai Property</span> Deals
          <br />
          with <span>Pre-Qualified</span> Investor Leads
        </h1>

        <p>
          We deliver real estate investors actively looking to buy off-plan
          properties in Dubai, Abu Dhabi & RAK.
        </p>

        <WhatsAppBtn />
      </section>

      {/* ================= BUSINESS SECTION ================= */}

      <section className="business-section">
        <div className="business-wrapper">
          <div className="left-content">
            <h1>Why Brokers Scale Faster With Our System</h1>

            <p className="sub-heading">
              A Unified Investor Lead Acquisition Engine Built for UAE Brokers
            </p>

            <p>
              We operate a performance-driven system that attracts, filters,
              and delivers high-intent off-plan property investors through
              multi-channel acquisition strategies including paid advertising,
              search intent capture, and targeted real estate funnels.
            </p>
          </div>

          <div className="right-content">
            {features.map((item, index) => (
              <div className="feature" key={index}>
                <div className="icon">
                  <FaCheck />
                </div>

                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CITIES SECTION ================= */}

      <section className="start-section">
        <h2>UAE-Wide Investor Demand Network for Off-Plan Projects</h2>

        <p className="section-intro">
          We generate and deliver qualified property investors actively
          searching across key UAE real estate markets — tailored to each
          city’s development activity and demand profile.
        </p>

        <div className="steps">
          {cities.map((city, index) => (
            <div className="hex-card" key={index}>
              <div className="hex-icon">{city.icon}</div>

              <h3>{city.title}</h3>

              <p>{city.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REAL ESTATE DATABASE SECTION ================= */}

      <section className="real-estate-database-section-x9">
        <div className="real-estate-header-x9">
          <span className="real-estate-small-title-x9">
            VERIFIED DATABASE ACCESS
          </span>

          <h2>Verified Real Estate Databases Access</h2>

          <p>
            Access premium real estate owner and investor databases across
            Dubai, Abu Dhabi and international high-net-worth investor markets.
          </p>
        </div>

        <div className="real-estate-services-row-x9">
          {locations.map((item, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? "real-estate-card-highlight-x9"
                  : "real-estate-card-x9"
              }
            >
              <div className="real-estate-icon-x9">{item.icon}</div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= NEXORA SECTION ================= */}

      <section className="nexora-section">
        <div className="nexora-container">
          <div className="nexora-heading">
            <h2>Why Brokers Work With Nexora Leads</h2>

            <p>
              We operate on a performance-driven lead delivery model built
              specifically for real estate professionals who prioritize
              quality, consistency, and conversion.
            </p>
          </div>

          <div className="nexora-grid">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`nexora-card ${card.active ? "active" : ""}`}
              >
                <div className="nexora-icon">{card.icon}</div>

                <h3>{card.title}</h3>

                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SALES SECTION ================= */}

      <section className="sales-section" id="contact">
        <div className="sales-container">
          <h1>Ready to Scale Your Property Sales?</h1>

          <p>
            Stop chasing cold leads. Start working with real investors actively
            looking for off-plan opportunities in the UAE. Get verified
            investor leads delivered directly to your pipeline today.
          </p>

          <div className="sales-btn-wrap">
            <WhatsAppBtn />
          </div>
        </div>
      </section>

      {/* ================= FLOATING WHATSAPP ================= */}

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btns"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <Footer />
    </>
  );
}

export default HeroSection;