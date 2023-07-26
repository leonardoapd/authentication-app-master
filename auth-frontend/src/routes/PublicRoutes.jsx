import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';

export default function PublicRoutes({ setIsLoggedIn }) {
	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<Routes>
			<Route path='login' element={<Login onLogin={handleLogin} />} />
			<Route path='signup' element={<SignUp />} />

			{/* Si el usuario intenta acceder a una ruta no válida, redirigir a /login */}
			<Route path='*' element={<Navigate to='/login' replace />} />
		</Routes>
	);
}
