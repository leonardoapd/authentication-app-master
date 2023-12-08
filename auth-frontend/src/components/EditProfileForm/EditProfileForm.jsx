import { useEffect, useState } from 'react';
import { UserInfo } from '../../models/user-info';
import EditProfilePhoto from '../EditProfilePhoto/EditProfilePhoto';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/FormTextarea';
import './EditProfileForm.css';
import { uploadAvatar } from '../../services/user-services';
export default function EditProfileForm({ onSubmit, user, error }) {
	const [formValues, setFormValues] = useState(new UserInfo( user?.name, user?.bio, user?.photo, user?.phone, user?.email, user?.password));
	const [photo, setPhoto] = useState(null);

	const handleChange = (newValue, e) => {
		const { name } = e.target;
		setFormValues({ ...formValues, [name]: newValue });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Once the user submits the form, the photo will be uploaded to the server and the url will be set to the formValues
		// to store the url in the database
		formValues.photo = await uploadAvatar(photo);
		onSubmit(formValues);
	};

	// When the user selects a file, it will be set to the state
	const uploadPhoto = async (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('FileName', file.name);
		formData.append('FileType', file.type);
		formData.append('FolderName', 'ProfilePictures');
		
		setPhoto(formData);
	}

	return (
		<>
			<form action='' className='form edit-form'>
				<EditProfilePhoto onChange={uploadPhoto} />

				<FormInput
					label='Name'
					name='name'
					type='text'
					onChange={handleChange}
					initialValue={formValues.name} // Utiliza formValues.name en lugar de user?.name
				/>

				<FormTextarea
					label='Bio'
					name='bio'
					type='textarea'
					onChange={handleChange}
					initialValue={formValues.bio} // Utiliza formValues.bio en lugar de user?.bio
					rows={4}
				/>

				<FormInput
					label='Phone'
					name='phone'
					type='number'
					onChange={handleChange}
					initialValue={formValues.phone} // Utiliza formValues.phone en lugar de user?.phone
				/>

				<FormInput
					label='Email'
					name='email'
					type='email'
					disabled
					initialValue={formValues.email} // Utiliza formValues.email en lugar de user?.email
				/>

				<FormInput
					label='Password'
					name='password'
					type='password'
					onChange={handleChange}
					initialValue={formValues.password} // Utiliza formValues.password en lugar de user?.password
				/>

				{error && <p className='container__error-message'>{error}</p>}

				<button
					className='form__button edit-form__button'
					type='submit'
					onClick={handleSubmit}
				>
					Save
				</button>
			</form>
		</>
	);
}
