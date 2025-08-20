import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const unitsApi = {
  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/units`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  create: async (name) => {
    try {
      const response = await axios.post(`${BASE_URL}/units`, { name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  update: async (id, name) => {
    try {
      const response = await axios.put(`${BASE_URL}/units/${id}`, { name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/units/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
