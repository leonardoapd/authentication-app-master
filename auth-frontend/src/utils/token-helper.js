import jwtDecode from 'jwt-decode';

function setToken(token) {
	localStorage.setItem('token', token);
}

function getToken() {
	return localStorage.getItem('token');
}

function removeToken() {
	localStorage.removeItem('token');
}

function getEmailFromToken() {
	const token = localStorage.getItem('token');

	try {
		const decodedToken = jwtDecode(token);
		if (decodedToken && decodedToken.sub) {
			return decodedToken.sub;
		} else {
			return null; // El token no contiene un email válido
		}
	} catch (error) {
		console.error('Token not valid', error);
		return null;
	}
}

export { getToken, removeToken, setToken, getEmailFromToken };
