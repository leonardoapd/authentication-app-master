import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import { Link } from 'react-router-dom';
import { useColorMode } from '../../context/ColorModeContext';
import './EditInfo.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function EditInfo() {
	const { isDarkMode } = useColorMode();

	return (
		<>
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
				<EditProfileForm />
			</div>
		</>
	);
}
