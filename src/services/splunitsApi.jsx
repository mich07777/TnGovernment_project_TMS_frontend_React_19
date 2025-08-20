import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const splunitsApi = {
  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/splunits`);
    return response.data;
  },
  create: async (name) => {
    const response = await axios.post(`${BASE_URL}/splunits`, { name });
    return response.data;
  },
  update: async (id, name) => {
    const response = await axios.put(`${BASE_URL}/splunits/${id}`, { name });
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${BASE_URL}/splunits/${id}`);
    return response.data;
  }
};
