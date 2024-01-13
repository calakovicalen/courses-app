/* USER API */
export const URL = 'http://localhost:4000';

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

export const validateToken = async (token) => {
	try {
		const response = await fetch(`${URL}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: `${token}`,
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error validating token:', error);
		throw error;
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

export const fetchCourse = async (courseId: string) => {
	try {
		const response = await fetch(`${URL}/courses/${courseId}`);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch single course. Status: ${response.status}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Error fetching single course: ${error.message}`);
	}
};

export const updateCourse = async (courseData, token: string) => {
	try {
		const response = await fetch(`${URL}/courses/${courseData.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
			body: JSON.stringify(courseData),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to update single course. Status: ${response.status}`
			);
		}

		const updatedCourse = await response.json();
		return updatedCourse;
	} catch (error) {
		throw new Error(`Error updating single course: ${error.message}`);
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
		return data.result;
	} catch (error) {
		console.error('Error adding course:', error);
		throw error;
	}
};

export const deleteAuthor = async (authorId, token) => {
	try {
		const response = await fetch(`${URL}/authors/${authorId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error deleting course:', error);
		throw error;
	}
};
