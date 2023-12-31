// SignUp.js
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useColorMode } from '../../context/ColorModeContext';
import FormInput from '../../components/FormInput/FormInput';
import Logo from '../../components/Logo/Logo';
import SocialButton from '../../components/SocialButton/SocialButton';
import { UserCredentials } from '../../models/user-credentials';
import { register } from '../../services/user-services';
import images from '../../constants/images';
import './SignUp.css';

function SignUp() {
	const [formValues, setFormValues] = useState(new UserCredentials());
	const [errorMessage, setErrorMessage] = useState('');
	const { isDarkMode } = useColorMode();
	const navigate = useNavigate();
	const GH_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

	// Function to handle changes to the form inputs and update the formValues state
	const handleChange = (newValue, e) => {
		const { name } = e.target;
		setFormValues({ ...formValues, [name]: newValue });
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await register(formValues).then(() => {
				navigate('/login');
			});
		} catch (error) {
			if (error.response && error.response.status === 409) {
				setErrorMessage('User already exists');
			} else {
				setErrorMessage('An error occurred. Please try again later.');
				console.log(error);
			}
		}
	};

	const handleGithubLogin = async () => {
		try {
			window.location.assign(
				`https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}`
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main className='container'>
			<Logo isDarkMode={isDarkMode} />
			<h2 className={`container__heading ${isDarkMode}`}>
				Join thousands of learners from around the world
			</h2>
			<p className={`container__text ${isDarkMode}`}>
				Master web development by making real-life projects. There are
				multiple paths for you to choose
			</p>
			<form action='' className='form'>
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
					className='form__button'
					type='submit'
					onClick={handleSubmit}
				>
					Start coding now
				</button>
			</form>
			{errorMessage && <p className='container__error-message'>{errorMessage}</p>}
			<p className='container__social-text'>
				or continue with these social profile{' '}
			</p>
			<div className='container__social-buttons'>
				<SocialButton icon={images.googleIcon} altText='Google logo' />
				<SocialButton
					icon={images.facebookIcon}
					altText='Facebook logo'
				/>
				<SocialButton
					icon={images.twitterIcon}
					altText='Twitter logo'
				/>
				<SocialButton
					icon={images.githubIcon}
					altText='Github logo'
					onClick={handleGithubLogin}
				/>
			</div>

			<p className='container__social-text'>
				Already a member? <Link to='/login'>Login</Link>
			</p>
		</main>
	);
}

export default SignUp;
