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

/* COURSES API */

export const fetchCourses = async () => {
	try {
		const response = await fetch(`${URL}/courses/all`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching courses:', error);
		throw error;
	}
};

export const addCourse = async (courseData, token) => {
	try {
		const response = await fetch(`${URL}/courses/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
			body: JSON.stringify(courseData),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error adding course:', error);
		throw error;
	}
};

export const deleteCourse = async (courseId, token) => {
	try {
		await fetch(`${URL}/courses/${courseId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		});
	} catch (error) {
		console.error('Error deleting course:', error);
		throw error;
	}
};

/* AUTHORS API */

export const fetchAuthors = async () => {
	try {
		const response = await fetch(`${URL}/authors/all`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching courses:', error);
		throw error;
	}
};

export const addAuthor = async (authorData, token) => {
	try {
		const response = await fetch(`${URL}/authors/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
			body: JSON.stringify(authorData),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error adding course:', error);
		throw error;
	}
};

export const deleteAuthor = async (authorId, token) => {
	try {
		await fetch(`${URL}/courses/${authorId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		});
	} catch (error) {
		console.error('Error deleting course:', error);
		throw error;
	}
};
