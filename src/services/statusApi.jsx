import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const statusApi = {
  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/statuses`);
    return response.data;
  },

  create: async (name) => {
    const response = await axios.post(`${BASE_URL}/statuses`, { name });
    return response.data;
  },

  update: async (id, name) => {
    const response = await axios.put(`${BASE_URL}/statuses/${id}`, { name });
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${BASE_URL}/statuses/${id}`);
    return response.data;
  }
};
