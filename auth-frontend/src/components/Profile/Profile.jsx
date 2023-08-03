import { useColorMode } from '../../context/ColorModeContext';
import { useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import './Profile.css';

export default function Profile({ user }) {
    const { isDarkMode } = useColorMode();

	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/edit-info');
	};

	return (
		<section className={`profile ${isDarkMode}`}>
			<div className='profile__header'>
				<h2 className='profile__title'>Profile</h2>
				<button className='profile__edit-button' onClick={handleClick}>Edit</button>
			</div>
			<div className='profile__photo'>
				<h3 className='profile__subtitle'>Photo</h3>
				<img className='profile__image' src={user?.photo || images.user} alt='Profile' />
			</div>
			<div className='profile__name'>
				<h3 className='profile__subtitle'>Name</h3>
				<p className='profile__content'>{user?.name || 'Set your name'}</p>
			</div>
			<div className='profile__bio'>
				<h3 className='profile__subtitle'>Bio</h3>
				<p className='profile__content'>{user?.bio || 'Set your bio'}</p>
			</div>
			<div className='profile__phone'>
				<h3 className='profile__subtitle'>Phone</h3>
				<p className='profile__content'>{user?.phone || 'Set your phone'}</p>
			</div>
			<div className='profile__email'>
				<h3 className='profile__subtitle'>Email</h3>
				<p className='profile__content'>{user?.email}</p>
			</div>
			<div className='profile__password'>
				<h3 className='profile__subtitle'>Password</h3>
				<p className='profile__content'>**********</p>
			</div>
		</section>
	);
}
