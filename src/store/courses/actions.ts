import {
	AddCourseAction,
	CourseType,
	CoursesActionTypes,
	DeleteCourseAction,
	EditCourseAction,
	GetCoursesAction,
} from './types';

export const addCourseAction = (courseData: CourseType): AddCourseAction => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload: courseData,
});

export const editCourseAction = (courseData: CourseType): EditCourseAction => ({
	type: CoursesActionTypes.EDIT_COURSE,
	payload: courseData,
});

export const deleteCourseAction = (courseId: string): DeleteCourseAction => ({
	type: CoursesActionTypes.DELETE_COURSE,
	payload: courseId,
});

export const getCoursesAction = (
	coursesData: CourseType[]
): GetCoursesAction => ({
	type: CoursesActionTypes.GET_COURSES,
	payload: coursesData,
});
