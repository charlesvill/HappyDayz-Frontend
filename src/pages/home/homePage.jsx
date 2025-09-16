import { Authorization } from '../../utils/auth/authProvider';
import { useContext } from 'react';

export function HomePage() {
  const { user, error } = useContext(Authorization);
  if (user) {
    console.dir(user);
  }

  return (
    <section>
      <header>
        <h2>Welcome to Happy Dayz index</h2>
      </header>
      <div>
        {user && <span>{user.first_name}</span>}
        {error && error.message}
      </div>
    </section>
  );
}
