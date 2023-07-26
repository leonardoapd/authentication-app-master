import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { useAuth } from '../context/AuthContext';

export default function AppRouter() {
	const { isLoggedIn } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? (
					<Route path='/*' element={<PrivateRoutes />} />
				) : (
					<Route path='/*' element={<PublicRoutes />} />
				)}
			</Routes>
		</BrowserRouter>
	);
}
