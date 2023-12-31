import { AuthorType } from '../authors/types';

export const enum CoursesActionTypes {
	ADD_COURSE = 'ADD_COURSE',
	EDIT_COURSE = 'EDIT_COURSE',
	DELETE_COURSE = 'DELETE_COURSE',
}
export interface CourseType {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: AuthorType[];
}

export type CoursesAction =
	| AddCourseAction
	| EditCourseAction
	| DeleteCourseAction;

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
