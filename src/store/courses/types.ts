export const enum CoursesActionTypes {
	ADD_COURSE = 'ADD_COURSE',
	UPDATE_COURSE = 'UPDATE_COURSE',
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
	| UpdateCourseAction
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

export type UpdateCourseAction = {
	type: CoursesActionTypes.UPDATE_COURSE;
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
