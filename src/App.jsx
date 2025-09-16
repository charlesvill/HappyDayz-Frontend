import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IndexLayout } from './components/indexLayout/indexLayout';
import { NotFound } from './components/notFound/notFound';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { Dashboard } from './pages/dashboard/dashboard';
import { HomePage } from './pages/home/homePage';
import { LogIn } from './pages/log-in/logIn';
import { SignUp } from './pages/sign-up/signUp';
import { EventLayout } from './components/eventLayout/eventLayout';
import { Event } from './pages/event/event';
import { AuthProvider } from './utils/auth/authProvider';
import { AuthGate } from './utils/auth/authPath';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <IndexLayout />,
      children: [
        {
          // check user and url if / redirect to dash
          // if home && user -> home
          index: true,
          element: <HomePage />,
        },
        {
          path: 'home',
          element: <HomePage />,
        },
        {
          path: 'log-in',
          element: <LogIn />,
        },
        {
          path: 'sign-up',
          element: <SignUp />,
        },
        {
          path: 'dashboard/:userid',
          element: (
            <AuthGate>
              <Dashboard />
            </AuthGate>
          ),
        },
      ],
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/event',
      element: (
        // authgate needs to be updated for event pages, prompt for guest credentials
        <AuthGate>
          <EventLayout />
        </AuthGate>
      ),
      children: [
        {
          path: ':eventid',
          element: <Event />,
        },
      ],
      errorElement: <ErrorBoundary />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <div id="app">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
