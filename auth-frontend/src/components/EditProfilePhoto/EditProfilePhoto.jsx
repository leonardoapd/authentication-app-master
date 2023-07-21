import { useState } from 'react';
import './EditProfilePhoto.css'
import images from '../../constants/images';

export default function EditProfilePhoto({ onChange }) {
	const [file, setFile] = useState(null);
	const [error, setError] = useState('');

	const handleChange = (e, file) => {
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
        onChange(selectedFile, e);
	};

	return (
		<div className='edit-profile-photo'>
			<div className='edit-profile-photo__container'>
				<img src={images.user} alt='profile photo' className='edit-profile-photo__image' />
				<input
					className='edit-profile-photo__input'
					title='profile photo'
					name='profile-photo'
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
