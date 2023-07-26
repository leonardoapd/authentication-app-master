import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useColorMode } from '../../context/ColorModeContext';
import { useUser } from '../../context/UserContext';
import { updateUser } from '../../services/user-services';
import Navbar from '../../components/Navbar/Navbar';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './EditInfo.css';

export default function EditInfo() {
	const { isDarkMode } = useColorMode();
	const navigate = useNavigate();
	const { user, editUser } = useUser();
	
	
	const handleSubmit = async (values) => {
		await updateUser(values).then((updatedUser) => {
			editUser(updatedUser);
			navigate('/personal-info');
		});
	};

	return (
		<>
			<Navbar />
			<div className='edit-info__back-container'>
				<Link
					to='/personal-info'
					className={`edit-info__back ${isDarkMode}`}
				>
					<ArrowBackIosIcon />
					Back
				</Link>
			</div>

			<div className='container edit-container'>
				<main className='edit-info'>
					<h1 className={`edit-info__title ${isDarkMode}`}>
						Change Info
					</h1>
					<p className={`edit-info__text ${isDarkMode}`}>
						Changes will be reflected to every services
					</p>
				</main>
				<EditProfileForm onSubmit={handleSubmit} user={user} />
			</div>
		</>
	);
}
