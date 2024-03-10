import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { router } from './router.jsx';
import { RouterProvider } from 'react-router-dom';
import UserProvider from './pages/UserProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router}/>
    </UserProvider>
    
  </React.StrictMode>,
)

