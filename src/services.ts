/* const coursesAPI = () => {

} */

/* USER API */
const URL = 'http://localhost:4000';

export const loginUser = async ({ email, password }) => {
	try {
		const response = await fetch(`${URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password, email }),
		});

		const result = await response.json();

		if (response.ok) {
			return { success: true, data: result };
		} else {
			return { success: false, error: result.errors[0] };
		}
	} catch (error) {
		console.error('Error during login:', error);
		return { success: false, error: 'An error occurred during login' };
	}
};

export const logoutUser = async (token) => {
	try {
		const response = await fetch(`${URL}/logout`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`, // Include the token in the headers
			},
		});

		if (response.ok) {
			return { success: true };
		} else {
			const result = await response.json();
			return { success: false, error: result.errors[0] };
		}
	} catch (error) {
		console.error('Error during logout:', error);
		return { success: false, error: 'An error occurred during logout' };
	}
};
