import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from '../utils/config';

export default function useDropdowns(requestedTables = null) {
  const [dropdowns, setDropdowns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        setLoading(true);
        
        const params = requestedTables ? 
          `?tables=${requestedTables.join(',')}` : '';
        
        const res = await axios.get(
          `${BASE_URL}/dropdowns${params}`
        );
        
        setDropdowns(res.data);
      } catch (err) {
        setError(err.response?.data || {
          message: 'Failed to load dropdowns'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
  }, [requestedTables]);

  return { dropdowns, loading, error };
}