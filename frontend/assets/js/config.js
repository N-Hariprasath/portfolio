// Central Config File for Portfolios
const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8080/api'
        : 'https://portfolio-backend-n-hariprasath.onrender.com/api',
    UPLOAD_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8080'
        : 'https://portfolio-backend-n-hariprasath.onrender.com'
};
