import { Authorization } from '../../utils/auth/authProvider';
import { useContext } from 'react';

export function HomePage() {
  const { user, error } = useContext(Authorization);

  return (
    <section>
      <header>
        <h2>Welcome to Happy Dayz index</h2>
      </header>
      <div>
        {user && user.first_name}
        {error && error.message}
      </div>
    </section>
  );
}
