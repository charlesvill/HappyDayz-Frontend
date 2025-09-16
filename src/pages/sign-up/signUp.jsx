import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverHostName, apiFetch } from '../../utils/apiUtils';
import { Authorization } from '../../utils/auth/authProvider';

export function SignUp() {
  const [fieldData, setFieldData] = useState({});
  const { error, setError } = useContext(Authorization);
  const navigate = useNavigate();
  const url = serverHostName() + '/user';

  async function handleInput(e) {
    const fieldName = e.target.id;
    const value = e.target.value;

    setFieldData({ ...fieldData, [fieldName]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await apiFetch(url, null, fieldData, 'POST');
    if (response instanceof Error) {
      setError(response);
    }
    console.log(response);
    navigate('/log-in', { replace: true });
  }
  return (
    <section>
      <header>
        <h2>Create An Account</h2>
      </header>
      <article>
        <span>{error && error}</span>
      </article>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={fieldData.username || ''}
          onChange={handleInput}
        />
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          value={fieldData.first_name || ''}
          onChange={handleInput}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          value={fieldData.last_name || ''}
          onChange={handleInput}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={fieldData.password || ''}
          onChange={handleInput}
        />
        <label htmlFor="confirm_pass">Confirm Password</label>
        <input
          type="password"
          id="password"
          value={fieldData.confirm_pass || ''}
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>Create Account</button>
      </form>
    </section>
  );
}
