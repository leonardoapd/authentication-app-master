import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Importa useState si aún no lo has hecho
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { getToken } from '../utils/token-helper';

export default function AppRouter() {
	const [isLoggedIn, setIsLoggedIn] = useState(getToken() ? true : false);

	useEffect(() => {
		setIsLoggedIn(getToken() ? true : false);
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? (
					<Route path='/*' element={<PrivateRoutes />} />
				) : (
					<Route
						path='/*'
						element={<PublicRoutes setIsLoggedIn={setIsLoggedIn} />}
					/>
				)}
			</Routes>
		</BrowserRouter>
	);
}
