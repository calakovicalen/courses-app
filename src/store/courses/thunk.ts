import {
	addCourse,
	deleteCourse,
	fetchCourse,
	fetchCourses,
	updateCourse,
} from 'src/services';
import {
	addCourseAction,
	deleteCourseAction,
	getCourseAction,
	getCoursesAction,
	updateCourseAction,
} from './actions';

export const fetchCoursesThunk = () => async (dispatch: any) => {
	try {
		const coursesData = await fetchCourses();
		dispatch(getCoursesAction(coursesData.result));
	} catch (error) {
		console.error('Error fetching authors:', error);
	}
};

export const addCourseThunk =
	(courseData, token: string) => async (dispatch: any) => {
		try {
			const addedCourse = await addCourse(courseData, token);
			dispatch(addCourseAction(addedCourse));
			return addedCourse.result;
		} catch (error) {
			console.error('Error adding course:', error);
		}
	};

export const deleteCourseThunk =
	(courseId: string, token: string) => async (dispatch: any) => {
		try {
			const deletedCourse = await deleteCourse(courseId, token);
			dispatch(deleteCourseAction(courseId));
			return deletedCourse;
		} catch (error) {
			console.error('Error deleting course:', error);
		}
	};

export const fetchCourseThunk = (courseId) => async (dispatch) => {
	try {
		const courseData = await fetchCourse(courseId);
		dispatch(getCourseAction(courseId));
		return courseData;
	} catch (error) {
		console.error('Error fetching single course', error);
	}
};

export const updateCourseThunk =
	(courseData, token: string) => async (dispatch: any) => {
		try {
			const updatedCourse = await updateCourse(courseData, token);
			dispatch(updateCourseAction(updatedCourse));
			return updatedCourse.result;
		} catch (error) {
			console.error('Error updating single course:', error);
		}
	};
