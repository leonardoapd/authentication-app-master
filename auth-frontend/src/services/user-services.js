import apiClient from '../api/api-client';
import { setToken } from '../utils/token-helper';

export const login = async (userCredentials) => {
	try {
		const response = await apiClient.post('/auth/signin', userCredentials);
		const headers = response.headers;
		const bearerToken = headers['authorization'];
		const token = bearerToken.replace('Bearer ', '');
		setToken(token);
	} catch (error) {
		console.error('Error while logging in user', error.message);
		throw error;
	}
};

export const register = async (userCredentials) => {
	try {
		await apiClient.post('/auth/signup', userCredentials);
	} catch (error) {
		console.error('Error while registering user', error.message);
		throw error;
	}
};
