export const sendApiRequest = async (url, method, data, headers) => {
	try {
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			body: data ? JSON.stringify(data) : null,
		};

		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();

		return result;
	} catch (error) {
		console.error('Error in sendApiRequest:', error);
		throw error; // Rethrow the error to be caught by the calling code
	}
};
