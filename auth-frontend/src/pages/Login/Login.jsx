import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useColorMode } from '../../context/ColorModeContext';
import FormInput from '../../components/FormInput/FormInput';
import Logo from '../../components/Logo/Logo';
import images from '../../constants/images';
import { UserCredentials } from '../../models/user-credentials';
import { login } from '../../services/user-services';
import { setToken } from '../../utils/token-helper';
import './Login.css';

function Login() {
	const [formValues, setFormValues] = useState(new UserCredentials());
	const { isDarkMode } = useColorMode();
	const navigate = useNavigate();

	// Function to handle changes to the form inputs and update the formValues state
	const handleChange = (newValue, e) => {
		const { name } = e.target;
		setFormValues({ ...formValues, [name]: newValue });
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const authToken = await login(formValues);
			setToken(authToken);

			navigate('/personal-info');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className='container'>
			<Logo isDarkMode={isDarkMode} />
			<h2
				className={`container__heading ${
					isDarkMode === 'dark' ? 'dark' : 'light'
				}`}
			>
				{' '}
				Login{' '}
			</h2>
			<form action='' className='form'>
				<FormInput
					label='Email'
					name='email'
					type='email'
					onChange={handleChange}
				/>
				<FormInput
					label='Password'
					name='password'
					type='password'
					onChange={handleChange}
				/>

				<button
					className='form__button'
					type='submit'
					onClick={handleSubmit}
				>
					Login
				</button>
			</form>

			<p className='container__social-text'>
				or continue with these social profile{' '}
			</p>
			<div className='container__social-buttons'>
				<button className='container__social-button'>
					<img src={images.googleIcon} alt='Google logo' />
				</button>
				<button className='container__social-button'>
					<img src={images.facebookIcon} alt='Facebook logo' />
				</button>
				<button className='container__social-button'>
					<img src={images.twitterIcon} alt='Twitter logo' />
				</button>
				<button className='container__social-button'>
					<img src={images.githubIcon} alt='Github logo' />
				</button>
			</div>

			<p className='container__social-text'>
				Don&apos;t have an account yet?{' '}
				<Link to='/signup'>Register</Link>
			</p>
		</main>
	);
}

export default Login;
