import { useEffect, useState, useContext } from 'react';
import { apiFetch } from '../apiUtils';
import { Authorization } from '../auth/authProvider';

export function useFetchData(url, dependentVar) {
  const [data, setData] = useState(null);
  const { loading, setLoading, error, setError } = useContext(Authorization);

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
