// API Wrapper to perform REST calls
const API = {
    async request(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;
        
        // Attach authorization header if token exists
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const config = {
            ...options,
            headers
        };
        
        try {
            const response = await fetch(url, config);
            
            // Auto logout if unauthorized (401 or 403) and not currently on login page
            if ((response.status === 401 || response.status === 403) && !window.location.pathname.endsWith('login.html')) {
                localStorage.removeItem('token');
                window.location.href = 'login.html';
                return null;
            }
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Something went wrong' }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            // Check for empty body / upload responses that return text instead of json
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    },

    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    },

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    },

    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    },

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    },

    async upload(endpoint, formData) {
        const token = localStorage.getItem('token');
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: formData
            });
            
            if ((response.status === 401 || response.status === 403) && !window.location.pathname.endsWith('login.html')) {
                localStorage.removeItem('token');
                window.location.href = 'login.html';
                return null;
            }
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('API Upload error:', error);
            throw error;
        }
    }
};
