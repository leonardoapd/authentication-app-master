import { useEffect, useState } from 'react';
import { UserInfo } from '../../models/user-info';
import EditProfilePhoto from '../EditProfilePhoto/EditProfilePhoto';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/FormTextarea';
import './EditProfileForm.css';
export default function EditProfileForm({ onSubmit, user }) {
	const [formValues, setFormValues] = useState(new UserInfo( user?.name, user?.bio, user?.photo, user?.phone, user?.email, user?.password));

	const handleChange = (newValue, e) => {
		const { name } = e.target;
		setFormValues({ ...formValues, [name]: newValue });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formValues);
	};

	// useEffect(() => {
	// 	setFormValues(user);
	// }, [user]);

	return (
		<>
			<form action='' className='form edit-form'>
				<EditProfilePhoto onChange={handleChange} />

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
