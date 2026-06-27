import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import ReveiwBtn from "./ReveiwBtn";
import { getApprovedReviews } from "../../Api/reviewApi";

// ─── Constants ────────────────────────────────────────────────────────────────

const SLIDER_SETTINGS = {
  dots: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 3500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: 3, slidesToScroll: 1 },
    },
    {
      breakpoint: 992,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: false },
    },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ count = 5 }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <FaStar key={i} />
      ))}
    </div>
  );
}

function ReviewCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [needsReadMore, setNeedsReadMore] = useState(false);
  const measureRef = useRef(null);
  const review = item.review || "";

  const toggle = useCallback(() => setExpanded((v) => !v), []);

  const initial = item.name ? item.name.charAt(0).toUpperCase() : "U";

  const measureOverflow = useCallback(() => {
    const measureElement = measureRef.current;

    if (!measureElement) return;

    const hasOverflow =
      measureElement.scrollHeight > measureElement.clientHeight + 1;

    setNeedsReadMore(hasOverflow);

    if (!hasOverflow) {
      setExpanded(false);
    }
  }, []);

  useLayoutEffect(() => {
    setExpanded(false);
    measureOverflow();
  }, [review, measureOverflow]);

  useEffect(() => {
    window.addEventListener("resize", measureOverflow);

    return () => {
      window.removeEventListener("resize", measureOverflow);
    };
  }, [measureOverflow]);

  return (
    <div className="review-card">
      <StarRating count={item.rating || 5} />

      <div className={`review-body${expanded ? " is-expanded" : ""}`}>
        <p className={`review-text${!expanded ? " collapsed" : ""}`}>
          "{review}"
        </p>
        <p
          ref={measureRef}
          className="review-text review-text-measure collapsed"
          aria-hidden="true"
        >
          "{review}"
        </p>

        {needsReadMore && (
          <button
            className={`read-more-btn${expanded ? " open" : ""}`}
            onClick={toggle}
            aria-expanded={expanded}
          >
            {expanded ? "Read less" : "Read more"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="2,4 6,8 10,4" />
            </svg>
          </button>
        )}
      </div>

      <div className="client-info">
        <div className="avatar">{initial}</div>
        <div>
          <h4>{item.name || "Anonymous"}</h4>
          {item.designation && <span>{item.designation}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function ReveiwSlide() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getApprovedReviews();
        setReviews(data);
      } catch {
        setFetchError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Disable infinite scroll when not enough cards to fill the slider
  const sliderSettings = useMemo(
    () => ({ ...SLIDER_SETTINGS, infinite: reviews.length > 3 }),
    [reviews.length]
  );

  return (
    <section className="reviews-section">
      {/* Header */}
      <div className="reviews-header">
        <span>CLIENT SUCCESS STORIES</span>
        <h2>
          Trusted by businesses
          <br />
          <strong>Proven by Results.</strong>
        </h2>
        <p>Real feedback from professionals who use our solutions to grow faster.</p>
      </div>

      {/* States */}
      {isLoading && (
        <p className="reviews-state-msg">Loading reviews…</p>
      )}

      {!isLoading && fetchError && (
        <p className="reviews-state-msg reviews-state-error">{fetchError}</p>
      )}

      {!isLoading && !fetchError && reviews.length === 0 && (
        <p className="reviews-state-msg">
          No reviews yet. Be the first to share your experience!
        </p>
      )}

      {/* Slider */}
      {!isLoading && !fetchError && reviews.length > 0 && (
        <Slider {...sliderSettings} className="reviews-slider">
          {reviews.map((item, index) => (
            <div key={item._id || index} className="slide-wrapper">
              <ReviewCard item={item} />
            </div>
          ))}
        </Slider>
      )}

      <ReveiwBtn />
    </section>
  );
}

export default ReveiwSlide;
