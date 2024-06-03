import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, useKaryawan, usePaket, useTransaksi } from '@/context/hooks';
import Loader from '@/components/ui/loader';

export default function Dashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? (
		<div className="flex min-h-screen overflow-hidden">
			{/* Sidebar component */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			{/* Sidebar component */}

			<div className="flex-1 flex flex-col relative overflow-x-hidden pl-0 lg:pl-72 pt-14 lg:pt-16">
				{/* Header component */}
				<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				{/* Header component */}
				{/* Main content */}
				<main className="flex-1 p-4 xs:p-8 w-full overflow-y-auto">
					<Fetcher>
						<Outlet />
					</Fetcher>
				</main>
				{/* Main content */}
			</div>
		</div>
	) : (
		<Navigate to="/auth/login" replace />
	);
}

function Fetcher({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState(true);
	const { fetchTransaksi } = useTransaksi();
	const { fetchPaket } = usePaket();
	const { fetchKaryawan } = useKaryawan();

	useEffect(() => {
		const fetchAllData = async () => {
			await Promise.all([fetchTransaksi(), fetchPaket(), fetchKaryawan()]);
		};
		fetchAllData().finally(() => setLoading(false));
	}, []);

	return loading ? <Loader /> : <>{children}</>;
}
