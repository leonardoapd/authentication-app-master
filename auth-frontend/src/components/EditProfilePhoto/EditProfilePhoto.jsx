import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { uploadAvatar } from '../../services/user-services';
import './EditProfilePhoto.css'
import images from '../../constants/images';

export default function EditProfilePhoto({ onChange }) {
	const [file, setFile] = useState(null);
	const [error, setError] = useState('');
	const { user, editUser } = useUser();
	const [photo, setPhoto] = useState(null);

	const handleChange = async (e, file) => {
		const selectedFile = file === undefined ? e.target.files[0] : file;

		// Validate file type and size
		if (
			selectedFile.type !== 'image/jpeg' &&
			selectedFile.type !== 'image/png'
		) {
			setError('File type not supported');
			return;
		}

		if (selectedFile.size > 1000000) {
			setError('File size cannot exceed more than 1MB');
			return;
		}

		setError('');
		setFile(selectedFile);
		// Preview selected file in the browser
		const previewUrl = URL.createObjectURL(selectedFile);
		setPhoto(previewUrl);

		// Setting the file to the parent component
		onChange(selectedFile);
	};

	return (
		<div className='edit-profile-photo'>
			<div className='edit-profile-photo__container'>
				<img src={photo || user?.photo || images.user} alt='profile photo' className='edit-profile-photo__image' />
				<input
					className='edit-profile-photo__input'
					title='profile photo'
					name='photo'
                    id='profile-photo'
					type='file'
					accept='image/png, image/jpeg'
					onChange={handleChange}
				/>
                <label
                    htmlFor="profile-photo"
                    className='edit-profile-photo__btn'
                >
                    Change Photo
                </label>
			</div>

			{error && <p className='error'>{error}</p>}
		</div>
	);
}
