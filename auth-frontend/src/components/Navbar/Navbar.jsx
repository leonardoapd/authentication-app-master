import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useColorMode } from '../../context/ColorModeContext';
import { logout } from '../../services/user-services';
import { removeToken } from '../../utils/token-helper';
import { useAuth } from '../../context/AuthContext';
import images from '../../constants/images';
import Logo from '../Logo/Logo';
import './Navbar.css';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

export default function Navbar({ user }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { handleLogout: onLogout } = useAuth();
	const navigate = useNavigate();
	const { isDarkMode } = useColorMode();

	const handleMenuClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleMenuItemClick = async (path) => {
		if (path === '/logout') {
			await logout()
				.then(() => {
					onLogout();
					removeToken();
					navigate('/login');
				})
				.catch(() => navigate('/login'));
		} else {
			navigate(path);
		}
		setIsMenuOpen(false);
	};

	return (
		<>
			<nav className='navbar'>
				<div className='navbar__logo-container'>
					<Link to='/'>
						<Logo isDarkMode={isDarkMode} />
					</Link>
				</div>
				<div className='navbar__menu-container'>
					<img className='navbar__avatar' src={images.user} alt='' />
					<p className={`navbar__username ${isDarkMode}`}>
						{user?.name}
					</p>
					<button
						className={`navbar__menu-button ${
							isMenuOpen ? 'open' : ''
						}`}
						onClick={handleMenuClick}
					>
						<span
							className='arrow'
							style={
								isDarkMode === 'dark'
									? { borderTopColor: '#fff' }
									: { borderTopColor: '#000' }
							}
						></span>
					</button>
					{isMenuOpen && (
						<NavbarMenu onMenuItemClick={handleMenuItemClick} />
					)}
				</div>
			</nav>
		</>
	);
}
