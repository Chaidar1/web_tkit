import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // TANPA /api

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Redirect ke login jika perlu
      // window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================
// PUBLIC API ENDPOINTS
// ============================================================

// About API
export const aboutAPI = {
  getAbout: () => api.get('/about/'),
};

// Programs API
export const programsAPI = {
  getPrograms: () => api.get('/programs/'),
  getProgramById: (id) => api.get(`/programs/${id}`),
};

// News API
export const newsAPI = {
  getNews: (params) => api.get('/news/', { params }),
  getNewsDetail: (id) => api.get(`/news/${id}`),
  getTags: () => api.get('/news/tags'),
};

// Contact API
export const contactAPI = {
  getContact: () => api.get('/contact/'),
  sendMessage: (data) => api.post('/contact/', data),
};

// Hero Images API
export const heroImagesAPI = {
  getHeroImages: () => api.get('/hero/'),
};

// Welcome API
export const welcomeAPI = {
  getWelcome: () => api.get('/welcome/'),
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api;