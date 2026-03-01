import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generate content for multiple platforms
 */
export const generateContent = async (data) => {
  const response = await api.post('/generate', data);
  return response.data;
};

/**
 * Get supported platforms
 */
export const getPlatforms = async () => {
  const response = await api.get('/generate/platforms');
  return response.data;
};

/**
 * Get available tones
 */
export const getTones = async () => {
  const response = await api.get('/generate/tones');
  return response.data;
};

/**
 * Health check
 */
export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
