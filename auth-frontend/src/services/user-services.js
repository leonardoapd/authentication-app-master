import apiClient from '../api/api-client';
import { setToken, removeToken } from '../utils/token-helper';

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

export const logout = async () => {
	try {
		await apiClient.post('/auth/logout');
		removeToken();
	} catch (error) {
		console.error('Error while logging out user', error.message);
		throw error;
	}
};

export const getUser = async (email) => {
	try {
		const response = await apiClient.get(`/auth/me/${email}`);
		return response.data;
	} catch (error) {
		console.error('Error while getting user', error.message);
		throw error;
	}
};

export const updateUser = async (user) => {
	try {
		await apiClient.put('/auth/me', user);
	} catch (error) {
		console.error('Error while updating user', error.message);
		throw error;
	}
}
