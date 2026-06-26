// Drop this file into your existing customer React site, e.g. src/api/reviewApi.js
// Requires axios: npm install axios
// Requires VITE_API_URL=http://localhost:5000/api in your site's .env file
// (use process.env.REACT_APP_API_URL instead if your site uses Create React App)

import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Submit a new review — goes to "pending" automatically on the backend
export const submitReview = async ({ name, review, rating }) => {
  const response = await axios.post(`${API_URL}/reviews`, { name, review, rating });
  return response.data; // { message, data: { ...review } }
};

// Fetch only approved reviews for public display
export const getApprovedReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews`);
  return response.data.data; // array of approved reviews
};
