import { AddNewCoursesAction, CourseType, CoursesActionTypes } from './types';

export const addNewCourseAction = (
	courseData: CourseType
): AddNewCoursesAction => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload: courseData,
});

/* const deleteCourseAction = (courseData: CourseType) => ({
	type: DELETE_COURSE,
	payload,
});
const saveCoursesAction = (payload) => ({ type: SAVE_COURSES, payload }); */
