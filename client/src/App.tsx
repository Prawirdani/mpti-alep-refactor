import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';
import { publicRoutes, adminRoutes } from './pages';
import { H1 } from '@/components/typography';
import { Frown } from 'lucide-react';
import AuthProvider from './context/AuthProvider';
import { useEffect, useState } from 'react';
import { useKaryawan, usePaket } from '@/context/hooks';
import Loader from '@/components/ui/loader';
import TransaksiProvider from '@/context/TransaksiProvider';
import PaketProvider from '@/context/PaketProvider';
import KaryawanProvider from '@/context/KaryawanProvider';

export default function App() {
  const router = createBrowserRouter([
    ...publicRoutes,
    ...adminRoutes,
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return (
    <AuthProvider>
      <TransaksiProvider>
        <PaketProvider>
          <KaryawanProvider>
            <Fetcher>
              <RouterProvider router={router} />
            </Fetcher>
          </KaryawanProvider>
        </PaketProvider>
      </TransaksiProvider>
      <Toaster />
    </AuthProvider>
  );
}

function Fetcher({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { fetchPaket } = usePaket();
  const { fetchKaryawan } = useKaryawan();

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchPaket(), fetchKaryawan()]);
    };
    fetchAllData().finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="h-screen">
      <div className="h-full flex flex-col place-items-center">
        <Loader />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}

function NotFound() {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col place-items-center">
        <div className="my-auto [&>*]:mx-auto [&>*]:text-primary">
          <Frown size={64} />
          <H1 className="text-primary">Page Not Found!</H1>
        </div>
      </div>
    </div>
  );
}
