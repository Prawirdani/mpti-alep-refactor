import { Outlet, RouteObject } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/hooks';
import Dashboard from '@/components/layout/dashboard/Dashboard';
import Loader from '@/components/ui/loader';
import AdminIndex from './dashboard/AdminIndex';
import LoginPage from './dashboard/LoginPage';
import SettingPage from './dashboard/SettingPage';
import TransaksiPage from './dashboard/TransaksiPage';
import PublicContent from '@/components/layout/Content';
import HomePage from './public/Home';
import AboutPage from './public/About';
import ContactPage from './public/Contact';
import BookingPage from './public/Booking';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { identify } = useAuth();

  useEffect(() => {
    const identifyUser = async () => {
      await identify().finally(() => setIsLoading(false));
    };

    identifyUser();
  }, []);

  return isLoading ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : (
    <Outlet />
  );
}

export const adminRoutes: RouteObject[] = [
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    element: <PersistLogin />,
    children: [
      {
        path: '/admin',
        element: <Dashboard />,
        children: [
          {
            path: '/admin',
            element: <AdminIndex />,
          },
          {
            path: '/admin/transactions',
            element: <TransaksiPage />,
          },
          {
            path: '/admin/settings',
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
];

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicContent />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/booking',
        element: <BookingPage />,
      },
    ],
  },
];
