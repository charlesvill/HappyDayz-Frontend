import { useState, createContext, useEffect, useMemo } from 'react';
import { apiFetch, serverHostName } from '../apiUtils';

export const Authorization = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [path, setPath] = useState(null);
  const [mode, setMode] = useState('');
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  const getUserUrl = serverHostName() + '/user';

  useEffect(() => {
    const fetchData = async () => {
      let response;
      try {
        response = await apiFetch(getUserUrl, token, 'GET');
        setUser(response.user);
        setError(null);
        localStorage.setItem('token', token);
      } catch (err) {
        console.log(err.message);
        let errMsg;
        if (response instanceof Error) {
          errMsg =
            response.message.slice(0, 3) === '401'
              ? 'Not authorized please sign in'
              : err.message;
        }
        setError(errMsg);
        logOut();
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    };

    if (!token) {
      setInitializing(false);
      setLoading(false);
      return;
    }

    setInitializing(true);
    setLoading(true);
    fetchData();
  }, [token]);

  const login = async (url, data) => {
    setLoading(true);
    const response = await apiFetch(url, null, data, 'POST');

    if (response instanceof Error) {
      const errMsg =
        response.message.slice(0, 3) === '400'
          ? 'Username or password incorrect'
          : 'Other Error Occurred';
      logOut();
      console.error(errMsg);
      setError(errMsg);
      setLoading(false);
      return;
    }

    setToken(response.token);
    setUser(response.user);
    setLoading(false);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    return;
  };

  const authContextValue = useMemo(
    () => ({
      user,
      path,
      setPath,
      mode,
      token,
      setToken,
      login,
      logOut,
      loading,
      setLoading,
      initializing,
      setInitializing,
      error,
      setError,
    }),
    [user, path, mode, token, loading, initializing, error]
  );

  return (
    <>
      <Authorization.Provider value={authContextValue}>
        {!loading && children}
      </Authorization.Provider>
    </>
  );
}
