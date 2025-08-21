import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IndexLayout } from './components/indexLayout/indexLayout';
import { NotFound } from './components/notFound/notFound';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { Dashboard } from './pages/dashboard/dashboard';
import { HomePage } from './pages/home/homePage';
import { EventLayout } from './components/eventLayout/eventLayout';
import { Event } from './pages/event/event';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <IndexLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'home',
          element: <HomePage />,
        },
      ],
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/event',
      element: <EventLayout />,
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
      here is the main app here the authprovider will go inside of that will be
      the router provider
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
