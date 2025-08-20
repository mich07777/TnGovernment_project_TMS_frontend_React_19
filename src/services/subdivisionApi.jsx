import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const subdivisionApi = {
  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subdivisions`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  create: async (name) => {
    try {
      const response = await axios.post(`${BASE_URL}/subdivisions`, { name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  update: async (id, name) => {
    try {
      const response = await axios.put(`${BASE_URL}/subdivisions/${id}`, { name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/subdivisions/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
