import { AuthorType } from '../authors/types';

export const enum CoursesActionTypes {
	SAVE_COURSES = 'SAVE_COURSES',
	ADD_COURSE = 'ADD_COURSE',
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

interface SaveCourses {
	type: CoursesActionTypes.SAVE_COURSES;
	payload: CourseType[];
}

interface AddCourse {
	type: CoursesActionTypes.ADD_COURSE;
	payload: CourseType;
}

interface DeleteCourse {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
}

export type CoursesAction = SaveCourses | AddCourse | DeleteCourse;

export type AddNewCoursesAction = {
	type: CoursesActionTypes.ADD_COURSE;
	payload: CourseType;
};
