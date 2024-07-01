import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/hooks';
import Loader from '@/components/ui/loader';
import LoginPage from './dashboard/LoginPage';
import SettingPage from './dashboard/SettingPage';
import TransaksiPage from './dashboard/TransaksiPage';
import PublicPage from './public/Page';
import DashboardLayout from '@/components/layout/dashboard/Layout';
import Index from './dashboard/Index';
import KaryawanPage from './dashboard/KaryawanPage';
import AkunPage from './dashboard/AkunPage';
import PaketPage from './dashboard/PaketPage';

export const protectedRoutes: RouteObject[] = [
  {
    element: <PersistLogin />,
    children: [
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Index />,
          },
          {
            path: '/dashboard/transaksi',
            element: <TransaksiPage />,
          },
          {
            path: '/dashboard/settings',
            element: <SettingPage />,
          },
          {
            element: <AdminOnly />,
            children: [
              {
                path: '/dashboard/karyawan',
                element: <KaryawanPage />,
              },
              {
                path: '/dashboard/akun',
                element: <AkunPage />,
              },
              {
                path: '/dashboard/paket',
                element: <PaketPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicPage />,
  },
];

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { identify, isAuthenticated } = useAuth();

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
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace />
  );
}

function AdminOnly() {
  const { user } = useAuth();
  return user.role == 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
