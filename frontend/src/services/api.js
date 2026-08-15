import axios from 'axios';

// Base API instance
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
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
