import { URL } from 'src/constants';

export const usePostUser = async <T>(url: string, user: T) => {
	const response = await fetch(`${URL}${url}`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();

	return result;
};
