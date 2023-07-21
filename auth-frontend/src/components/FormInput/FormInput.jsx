import { forwardRef } from 'react';
import './FormInput.css';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PersonIcon from '@mui/icons-material/Person';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FormElement from '../FormElement/FormElement';

const FormInput = forwardRef((props, ref) => {
	const icons = {
		email: <MailRoundedIcon className='form-group__icon' />,
		password: <LockRoundedIcon className='form-group__icon' />,
		name: <PersonIcon className='form-group__icon' />,
    phone: <ContactPhoneIcon className="form-group__icon" />,
	};

	return (
		<FormElement
			icon={icons[props.label.toLowerCase()]}
			{...props}
			ref={ref}
		/>
	);
});

export default FormInput;
