import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import ReveiwBtn from "./ReveiwBtn";
import { getApprovedReviews } from "../../Api/reviewApi";

function ReveiwSlide() {

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getApprovedReviews();
        setReviews(data);
      } catch (error) {
        setFetchError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <>
    <section className="reviews-section">

      <div className="reviews-header">
        <span>CLIENT SUCCESS STORIES</span>

        <h2>
          Trusted by businesses
          <br />
          <strong>Proven by Results.</strong>
        </h2>

        <p>
          Real feedback from professionals who use our solutions
          to grow faster.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <p style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>
          Loading reviews...
        </p>
      )}

      {/* Error State */}
      {!isLoading && fetchError && (
        <p style={{ textAlign: "center", color: "#ef4444", padding: "40px 0" }}>
          {fetchError}
        </p>
      )}

      {/* Empty State */}
      {!isLoading && !fetchError && reviews.length === 0 && (
        <p style={{ textAlign: "center", color: "#64748b", padding: "40px 0" }}>
          No reviews yet. Be the first to share your experience!
        </p>
      )}

      {/* Slider — only renders when there are reviews */}
      {!isLoading && !fetchError && reviews.length > 0 && (
        <Slider {...settings} className="reviews-slider">

          {reviews.map((item, index) => (
            <div key={item._id || index} className="slide-wrapper">

              <div className="review-card">

                <div className="stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="review-text">
                  "{item.review}"
                </p>

                <div className="client-info">

                  <div className="avatar">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h4>{item.name}</h4>
                    {/* <span>{item.role}</span> */}
                  </div>

                </div>

              </div>

            </div>
          ))}

        </Slider>
      )}

      <ReveiwBtn />
    </section>

    </>
  );
}

export default ReveiwSlide;
