import axios from 'axios';
import { BASE_URL } from "../utils/config";

export const rankApi = {
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/ranks`);
    return res.data;
  },

  create: async (name) => {
    const res = await axios.post(`${BASE_URL}/ranks`, { name });
    return res.data;
  },

  update: async (id, name) => {
    const res = await axios.put(`${BASE_URL}/ranks/${id}`, { name });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/ranks/${id}`);
    return res.data;
  }
};
