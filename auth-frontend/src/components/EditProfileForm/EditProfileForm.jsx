import { useState } from 'react';
import { UserInfo } from '../../models/user-info';
import EditProfilePhoto from '../EditProfilePhoto/EditProfilePhoto';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/FormTextarea';
import './EditProfileForm.css';

export default function EditProfileForm() {
	const [formValues, setFormValues] = useState(new UserInfo());

	const handleChange = (newValue, e) => {
		const { name } = e.target;
		setFormValues({ ...formValues, [name]: newValue });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

	return (
		<>
			<form action='' className='form edit-form'>
				<EditProfilePhoto onChange={handleChange} />

				<FormInput
					label='Name'
					name='name'
					type='text'
					onChange={handleChange}
					value={formValues.name}
				/>

				<FormTextarea
					label='Bio'
					name='bio'
					type='textarea'
					onChange={handleChange}
					value={formValues.bio}
					rows={4}
				/>

				<FormInput
					label='Phone'
					name='phone'
					type='number'
					onChange={handleChange}
					value={formValues.phone}
				/>

				<FormInput
					label='Email'
					name='email'
					type='email'
					onChange={handleChange}
					value={formValues.email}
				/>

				<FormInput
					label='Password'
					name='password'
					type='password'
					onChange={handleChange}
					value={formValues.password}
				/>

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
