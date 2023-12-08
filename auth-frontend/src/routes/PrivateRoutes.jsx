import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PersonalInfo from '../pages/PersonalInfo/PersonalInfo';
import EditInfo from '../pages/EditInfo/EditInfo';
import { UserProvider } from '../context/UserContext';

export default function PrivateRoutes() {
  const location = useLocation();

  useEffect(() => {
    // Almacena la ruta actual en localStorage al cambiar la ubicación.
    localStorage.setItem('lastVisitedRoute', location.pathname);
  }, [location.pathname]);

  // Lee la última ruta visitada desde localStorage.
  const lastVisitedRoute = localStorage.getItem('lastVisitedRoute') || '/personal-info';

  return (
    <UserProvider>
      <Routes>
        <Route path='/personal-info' element={<PersonalInfo />} />
        <Route path='/edit-info' element={<EditInfo />} />
        <Route path='*' element={<Navigate to={lastVisitedRoute} replace />} />
      </Routes>
    </UserProvider>
  );
}
