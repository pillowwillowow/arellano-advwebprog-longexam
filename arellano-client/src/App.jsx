import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout';
import ProductPage from './pages/LandingPages/ProductPage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ProductListPage from './pages/LandingPages/ProductListPage';
import OrdersPage from './pages/LandingPages/OrdersPage';
import ProfilePage from './pages/LandingPages/ProfilePage.jsx';
import ManageUsersPage from './pages/LandingPages/ManageUsersPage.jsx';

// Auth Pages Structure
import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({
  children,
  allowedRoles
}) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  if (!token || !user) {
    return (
      <Navigate
        to="/auth/signin"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
};

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'products',
        element: <ProductListPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute
            allowedRoles={[
              'customer',
              'admin'
            ]}
          >
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <ProtectedRoute
            allowedRoles={['admin']}
          >
            <ManageUsersPage />
          </ProtectedRoute>
        ),
      },
    {
        path: 'profile',
        element: (
          <ProtectedRoute
            allowedRoles={['customer']}
          >
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'customer',
        element: (
          <ProtectedRoute
            allowedRoles={['customer']}
          >
            <div>
              Customer Page
            </div>
          </ProtectedRoute>
        ),
      },

      // Admin protected route example
      {
        path: 'admin',
        element: (
          <ProtectedRoute
            allowedRoles={['admin']}
          >
            <div>
              Admin Page
            </div>
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: 'auth/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      }
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;