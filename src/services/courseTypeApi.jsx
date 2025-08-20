import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const courseTypeApi = {
  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/coursetypes`);
    return response.data;
  },

  create: async (name) => {
    const response = await axios.post(`${BASE_URL}/coursetypes`, { name });
    return response.data;
  },

  update: async (id, name) => {
    const response = await axios.put(`${BASE_URL}/coursetypes/${id}`, { name });
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${BASE_URL}/coursetypes/${id}`);
    return response.data;
  }
};
