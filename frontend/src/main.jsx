import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Asistencia from '@pages/Asistencia'; 
import Personal from '@pages/Personals';
import Users from '@pages/Users';
import Pedidos from '@pages/Pedidos';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import HistorialAsistencia from '@pages/HistorialAsistencia';

import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/asistencia',
        element: <Asistencia/> 
      },
      {
        path: '/personal',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Personal />
        </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/orders',
        element: <Pedidos/>
      },
      {
        path: '/users',
        element: (
        <ProtectedRoute allowedRoles={['administrador']}>
          <Users />
        </ProtectedRoute>
        ),
      },
      {
        path: '/historial', 
        element: <HistorialAsistencia/> 
      }
    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
);