import { createBrowserRouter } from 'react-router-dom';
import Club from './components/Club';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './pages/Navbar'; 
import Perfil from './pages/Perfil'; 
import Card from './components/Card';

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Club />,
    },

    {
      path: '/login',
      Component: LogInPage,
    },

    {
      path: '/register',
      Component: RegisterPage,
    },

    {
      path: '/club',
      element: <Club />,
    },
    {
      path: '/navbar', 
      element: <Navbar/>,

    },
    {
      path: '/profile', 
      element: <Perfil/>
    },
    {
      path: '/search',
      Component: Card,
    }

  ]);
  