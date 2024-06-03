import IndexPage from './public/IndexPage';
import { Outlet, RouteObject } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/hooks';
import Dashboard from '@/components/layout/dashboard/Dashboard';
import Loader from '@/components/ui/loader';
import AdminIndex from './dashboard/AdminIndex';
import LoginPage from './dashboard/LoginPage';
import SettingPage from './dashboard/SettingPage';
import TransactionPage from './dashboard/TransactionPage';

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
						element: <TransactionPage />,
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
		path: '/',
		element: <IndexPage />,
	},
];
