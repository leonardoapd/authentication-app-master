import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ColorModeProvider } from './context/ColorModeContext';
import './App.css';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import PersonalInfo from './pages/PersonalInfo/PersonalInfo';

function App() {
	return (
		<ColorModeProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<SignUp />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/personal-info' element={<PersonalInfo />} />
				</Routes>
			</BrowserRouter>
		</ColorModeProvider>
	);
}

export default App;
