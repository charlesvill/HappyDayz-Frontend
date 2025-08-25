import { useEffect, useState } from 'react';
import { apiFetch } from '../apiUtils';

export function useFetchData(url, dependentVar) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await apiFetch(url);
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, dependentVar]);

  return { data, loading, error };
}
