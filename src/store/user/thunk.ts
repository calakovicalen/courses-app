import { loginUser, logoutUser, validateToken } from 'src/services';
import { loginFailure, loginRequest, loginSuccess, logout } from './actions';

export const login =
	(email: string, password: string) => async (dispatch: any) => {
		try {
			dispatch(loginRequest());

			const { success, data, error } = await loginUser({ email, password });
			if (success) {
				const { result: token } = data;
				const user = await validateToken(token);
				dispatch(loginSuccess(token, user));
			} else {
				dispatch(loginFailure(error));
			}
		} catch (error) {
			dispatch(loginFailure('An error occurred during login.'));
			console.log(error);
		}
	};

export const logoutAsync = (token: string) => async (dispatch: any) => {
	dispatch(logout());
	try {
		const result = await logoutUser(token);

		if (result.success) {
			alert('Successfully logged out');
		} else {
			alert(result.error);
		}
	} catch (error) {
		console.error('Error during logout:', error);
		alert('An error occurred during logout');
	}
};

export const validateTokenAsync = (token: string) => async (dispatch: any) => {
	if (token) {
		try {
			const data = await validateToken(token);
			dispatch(loginSuccess(token, data));
		} catch (error) {
			console.error('Error validating token:', error);
		}
	}
};
