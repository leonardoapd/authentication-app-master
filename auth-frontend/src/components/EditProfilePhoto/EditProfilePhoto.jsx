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
		const previewUrl = URL.createObjectURL(selectedFile);
		setPhoto(previewUrl);
		// const imgURL = await uploadPhoto(selectedFile);
		// user.photo = imgURL;
        // onChange(imgURL, e);
		onChange(selectedFile);
	};

	const uploadPhoto = async (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('FileName', file.name);
        formData.append('FileType', file.type);
        formData.append('FolderName', 'ProfilePictures');
		
		return await uploadAvatar(formData);
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
