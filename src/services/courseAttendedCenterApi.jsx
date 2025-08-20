import axios from 'axios';
import { BASE_URL } from '../utils/config';

export const courseAttendedCenterApi = {
  getAll: async () => {
    const response = await axios.get(`${BASE_URL}/course-attended-centers`);
    return response.data;
  },

  create: async (name) => {
    const response = await axios.post(`${BASE_URL}/course-attended-centers`, { name });
    return response.data;
  },

  update: async (id, name) => {
    const response = await axios.put(`${BASE_URL}/course-attended-centers/${id}`, { name });
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${BASE_URL}/course-attended-centers/${id}`);
    return response.data;
  }
};
