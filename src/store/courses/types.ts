export const enum CoursesActionTypes {
	ADD_COURSE = 'ADD_COURSE',
	EDIT_COURSE = 'EDIT_COURSE',
	DELETE_COURSE = 'DELETE_COURSE',
	GET_COURSES = 'GET_COURSES',
	GET_COURSE = 'GET_COURSE',
}
export interface CourseType {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export type CoursesAction =
	| AddCourseAction
	| EditCourseAction
	| DeleteCourseAction
	| GetCoursesAction
	| GetCourseAction;

export type GetCourseAction = {
	type: CoursesActionTypes.GET_COURSE;
	payload: string;
};

export type AddCourseAction = {
	type: CoursesActionTypes.ADD_COURSE;
	payload: CourseType;
};

export type EditCourseAction = {
	type: CoursesActionTypes.EDIT_COURSE;
	payload: CourseType;
};

export type DeleteCourseAction = {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
};

export type GetCoursesAction = {
	type: CoursesActionTypes.GET_COURSES;
	payload: CourseType[];
};
