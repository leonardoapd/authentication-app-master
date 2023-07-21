import Profile from '../../components/Profile/Profile';
import { useColorMode } from '../../context/ColorModeContext';
import Navbar from '../../components/Navbar/Navbar';
import './PersonalInfo.css';

export default function PersonalInfo() {
    const { isDarkMode } = useColorMode();

	return (
		<>
			<Navbar />
			<main className='personal-info'>
				<h1 className={`personal-info__title ${isDarkMode}`}> Personal Info</h1>
				<p className={`personal-info__text ${isDarkMode}`}>
					Basic info, like your name and photo
				</p>
			</main>
			<Profile />
		</>
	);
}
