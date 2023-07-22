import { Routes, Route, Navigate } from 'react-router-dom';
import PersonalInfo from '../pages/PersonalInfo/PersonalInfo';
import EditInfo from '../pages/EditInfo/EditInfo';

export default function PrivateRoutes() {
  return (
    <Routes>
        <Route path='/' element={<PersonalInfo />} />
        <Route path='/personal-info' element={<PersonalInfo />} />
        <Route path='/edit-info' element={<EditInfo />} />

        <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}
