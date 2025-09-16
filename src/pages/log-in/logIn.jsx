import { Authorization } from '../../utils/auth/authProvider';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverHostName } from '../../utils/apiUtils';

export function LogIn() {
  const [fieldData, setFieldData] = useState({});
  const { user, path, setPath, login } = useContext(Authorization);
  const navigate = useNavigate();

  useEffect(() => {
    // auth gate sends here if no user detected
    // after user global context updated and this updates, re-routes based on
    // if access to protected route was attempted

    if (user && path) {
      navigate(path, { replace: true });
      setPath(null);
    }
    if (user && !path) {
      navigate('/', { replace: true });
    }
  }, [user, path]);

  async function handleInput(e) {
    const fieldName = e.target.id;
    const value = e.target.value;
    setFieldData({ ...fieldData, [fieldName]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const url = serverHostName() + '/auth';
    await login(url, fieldData);
  }

  return (
    <section>
      <header>
        <h3>Log in</h3>
      </header>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={fieldData.username || ''}
          onChange={handleInput}
          required={true}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={fieldData.password || ''}
          onChange={handleInput}
          required={true}
        />
        <button type="submit" onClick={handleSubmit}></button>
      </form>
    </section>
  );
}
