import { createBrowserRouter } from 'react-router-dom';
import ClubDetails from './pages/ClubDetails';
import LandingPage from './pages/LandingPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';

export const router = createBrowserRouter([
    {
      path: '/',
      elemment: <LandingPage />,
    },

    {
      path: '/login',
      element: <LogInPage />,
    },

    {
      path: '/register',
      Component: RegisterPage,
    },

    {
      path: '/search',
      element: <SearchPage />,
    },

    {
      path: '/club',
      element: <ClubDetails />,
    }

  ]);
  