// Backend base URL. Must include the `/api` prefix (backend mounts routes under /api/*).
// Production default points at the deployed Render service.
// For local development, override via .env.local: REACT_APP_API_URL=http://localhost:5000/api
// TODO: replace the onrender.com host below with your actual Render service URL.
const API_BASE =
  process.env.REACT_APP_API_URL || "https://clinic-backend-t5ql.onrender.com/api";

export default API_BASE;
