import axios from 'axios';
import { BASE_URL } from "../utils/config";

// DocumentType API
export const ModeOfReceivingApi = {
  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/receiving-modes`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  create: async (name) => {
    try {
      const response = await axios.post(`${BASE_URL}/receiving-modes`, { name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  update: async (id, name) => {
    try {
      const response = await axios.put(`${BASE_URL}/receiving-modes/${id}`, { name });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/receiving-modes/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};