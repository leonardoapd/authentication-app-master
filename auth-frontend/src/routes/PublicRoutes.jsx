import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';

export default function PublicRoutes({ setIsLoggedIn }) {

  const handleLogin = () => {
    // Aquí se podría hacer alguna lógica para autenticar al usuario
    // Por ejemplo, enviar una solicitud al servidor para verificar las credenciales.
    // Si las credenciales son válidas, se llama a setIsLoggedIn(true)
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    // Aquí se podría hacer alguna lógica para crear una cuenta de usuario
    // Si la cuenta se crea exitosamente, se llama a setIsLoggedIn(true)
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path='login' element={<Login onLogin={handleLogin} />} />
      <Route path='signup' element={<SignUp onSignUp={handleSignUp} />} />

      {/* Si el usuario intenta acceder a una ruta no válida, redirigir a /login */}
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}
