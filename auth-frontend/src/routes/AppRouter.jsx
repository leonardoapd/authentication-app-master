import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'; // Importa useState si aún no lo has hecho
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

export default function AppRouter() {
	// Supongamos que isLoggedIn es un estado que indica si el usuario ha iniciado sesión o no
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
			<Routes>
				{/* Rutas privadas solo accesibles si el usuario ha iniciado sesión */}
				{isLoggedIn ? (
					<Route path='/*' element={<PrivateRoutes setIsLoggedIn={setIsLoggedIn} />} />
				) : (
					// Rutas públicas solo accesibles si el usuario NO ha iniciado sesión

					<Route
						path='/*'
						element={<PublicRoutes setIsLoggedIn={setIsLoggedIn} />}
					/>
				)}
			</Routes>
		</BrowserRouter>
	);
}
