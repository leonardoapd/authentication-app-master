import apiClient from '../api/api-client';

export const login = async (userCredentials) => {
	try {
		const response = await apiClient.post('/auth/login', userCredentials);
		return response.accessToken;
	} catch (error) {
		console.error('Error while logging in user', error.message);
		throw error;
	}
};

export const register = async (userCredentials) => {
    try {
        const response = await apiClient.post('/auth/register', userCredentials);
        return response.accessToken;
    } catch (error) {
        console.error('Error while registering user', error.message);
        throw error;
    }
}
