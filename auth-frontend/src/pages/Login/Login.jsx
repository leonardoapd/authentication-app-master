import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useColorMode } from '../../context/ColorModeContext';
import FormInput from '../../components/FormInput/FormInput';
import SocialButton from '../../components/SocialButton/SocialButton';
import Logo from '../../components/Logo/Logo';
import images from '../../constants/images';
import { UserCredentials } from '../../models/user-credentials';
import { login, githubLogin } from '../../services/user-services';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import Dialog from '../../components/Dialog/Dialog';

function Login({ onLogin }) {
	const [formValues, setFormValues] = useState(new UserCredentials());
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [isRedirecting, setIsRedirecting] = useState(false);
	const { isDarkMode } = useColorMode();
	const { handleLogin } = useAuth();
	const navigate = useNavigate();

	const GH_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

	const errorMessages = {
		400: 'Invalid credentials',
		401: 'Invalid request',
		404: 'User not found',
	};

	// Function to handle changes to the form inputs and update the formValues state
	const handleChange = (newValue, e) => {
		const { name } = e.target;
		setFormValues({ ...formValues, [name]: newValue });
	};

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(formValues).then(() => {
				handleLogin();
				navigate('/');
			});
		} catch (error) {
			if (error.response && error.response.status in errorMessages) {
				setErrorMessage(errorMessages[error.response.status]);
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

	useEffect(() => {
		const queryStr = window.location.search;
		const urlParams = new URLSearchParams(queryStr);
		const code = urlParams.get('code');

		if (code) {
			setIsRedirecting(true);
			try {
				githubLogin(code).then(() => {
					handleLogin();
					navigate('/');
				});
			} catch (error) {
				if (error.response && error.response.status in errorMessages) {
					setErrorMessage(errorMessages[error.response.status]);
				} else {
					setErrorMessage(
						'An error occurred. Please try again later.'
					);
					setIsRedirecting(false);
					console.log(error);
				}
			}
		}
	}, []);

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

			{errorMessage && (
				<p className='container__error-message'>{errorMessage}</p>
			)}

			{successMessage && (
				<p className='container__success-message'>{successMessage}</p>
			)}

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
				Don&apos;t have an account yet?{' '}
				<Link to='/signup'>Register</Link>
			</p>

			{isRedirecting && (
				<Dialog
					title='Login successful 🎉'
					content='Redirecting to home page...'
				/>
			)}
		</main>
	);
}

export default Login;
