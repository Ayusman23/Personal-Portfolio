import axios from 'axios';

// Base API instance - Automatically points to live Render backend in production
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? 'https://ayusman-personal-portfolio.onrender.com/api'
    : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 35000, // Generous 35s timeout for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cold-start auto-retry interceptor (Retries failed requests while Render wakes up)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    if (!config || !config.retryCount) {
      if (config) config.retryCount = 0;
    }

    // If server is waking up (network error, 502, 503, 504, or timeout)
    const isColdStart =
      !error.response ||
      error.response.status === 502 ||
      error.response.status === 503 ||
      error.response.status === 504 ||
      error.code === 'ECONNABORTED';

    if (isColdStart && config && config.retryCount < 3) {
      config.retryCount += 1;
      const delay = config.retryCount * 2500; // 2.5s, 5s, 7.5s
      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(config);
    }

    return Promise.reject(error);
  }
);

// Silent background wake-up ping for Render Free tier
export const wakeUpBackend = async () => {
  try {
    const rawHost = API_BASE_URL.replace('/api', '');
    fetch(`${rawHost}/healthz`, { mode: 'no-cors' }).catch(() => {});
  } catch (_) {}
};

// Profile APIs
export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.put('/profile', data);

// Projects APIs
export const getProjects = (params) => api.get('/projects', { params });
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Skills APIs
export const getSkills = () => api.get('/skills');
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Experience APIs
export const getExperiences = () => api.get('/experiences');
export const createExperience = (data) => api.post('/experiences', data);
export const updateExperience = (id, data) => api.put(`/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experiences/${id}`);

// Education APIs
export const getEducation = () => api.get('/education');
export const createEducation = (data) => api.post('/education', data);
export const updateEducation = (id, data) => api.put(`/education/${id}`, data);
export const deleteEducation = (id) => api.delete(`/education/${id}`);

// Certifications APIs
export const getCertifications = () => api.get('/certifications');
export const createCertification = (data) => api.post('/certifications', data);
export const updateCertification = (id, data) => api.put(`/certifications/${id}`, data);
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);

// Services APIs
export const getServices = () => api.get('/services');
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Contact / Message APIs
export const submitContactMessage = (data) => api.post('/contact', data);
export const getContactMessages = () => api.get('/contact');
export const updateContactMessageStatus = (id, data) => api.patch(`/contact/${id}`, data);
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`);

// Auth APIs
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const getAdminMe = () => api.get('/auth/me');

// System seed/reset
export const resetDatabase = () => api.post('/seed');

export default api;
