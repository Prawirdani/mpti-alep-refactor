import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';
import { publicRoutes, adminRoutes } from './pages';
import { H1 } from '@/components/typography';
import { Frown } from 'lucide-react';
import AuthProvider from './context/AuthProvider';

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
			<RouterProvider router={router} />
			<Toaster />
		</AuthProvider>
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
