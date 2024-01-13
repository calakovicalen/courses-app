import {
	AddCourseAction,
	CourseType,
	CoursesActionTypes,
	DeleteCourseAction,
	UpdateCourseAction,
	GetCourseAction,
	GetCoursesAction,
} from './types';

export const getCourseAction = (courseId: string): GetCourseAction => ({
	type: CoursesActionTypes.GET_COURSE,
	payload: courseId,
});

export const addCourseAction = (courseData: CourseType): AddCourseAction => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload: courseData,
});

export const updateCourseAction = (
	courseData: CourseType
): UpdateCourseAction => ({
	type: CoursesActionTypes.UPDATE_COURSE,
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
