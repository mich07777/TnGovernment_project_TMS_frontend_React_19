import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const trainingCenterApi = {
  getAll: async () => {
    const res = await axios.get(`${BASE_URL}/training-centers`);
    return res.data;
  },

  create: async (name) => {
    const res = await axios.post(`${BASE_URL}/training-centers`, { name });
    return res.data;
  },

  update: async (id, name) => {
    const res = await axios.put(`${BASE_URL}/training-centers/${id}`, { name });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${BASE_URL}/training-centers/${id}`);
    return res.data;
  }
};
