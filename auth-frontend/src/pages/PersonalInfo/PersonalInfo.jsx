import Profile from '../../components/Profile/Profile';
import { useEffect } from 'react';
import { useColorMode } from '../../context/ColorModeContext';
import { useUser } from '../../context/UserContext';
import Navbar from '../../components/Navbar/Navbar';

import './PersonalInfo.css';

export default function PersonalInfo() {
	const { isDarkMode } = useColorMode();
	const { user, getUserInfo } = useUser();

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<>
			<Navbar />
			<main className='personal-info'>
				<h1 className={`personal-info__title ${isDarkMode}`}>
					Personal Info
				</h1>
				<p className={`personal-info__text ${isDarkMode}`}>
					Basic info, like your name and photo
				</p>
			</main>
			<Profile user={user} />
		</>
	);
}
