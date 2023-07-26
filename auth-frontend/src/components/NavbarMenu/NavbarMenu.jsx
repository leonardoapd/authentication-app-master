import './NavbarMenu.css';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useColorMode } from '../../context/ColorModeContext';
import { useNavigate } from 'react-router-dom';

export default function NavbarMenu({ onMenuItemClick }) {
	const navigate = useNavigate();
	const { isDarkMode } = useColorMode();

    const handleMenuItemClick = (path) => {
        onMenuItemClick(path);
    };

	return (
		<>
			<ul
				className='navbar__menu'
				style={
					isDarkMode === 'dark'
						? { backgroundColor: '#1E2139' }
						: { backgroundColor: '#fff' }
				}
			>
				<li
					className='navbar__menu-item'
					onClick={() => handleMenuItemClick('/personal-info')}
				>
					<AccountCircleIcon />
					Profile
				</li>
				<li
					className='navbar__menu-item'
					onClick={() => handleMenuItemClick('/edit-info')}
				>
					<PeopleIcon />
					Group Chat
				</li>
				<li
					className='navbar__menu-item'
					onClick={() => handleMenuItemClick('/logout')}
				>
					<LogoutIcon />
					Logout
				</li>
			</ul>
		</>
	);
}
