import { Author, Course } from 'src/constants';

export interface CoursesProps {
	courses: Course[];
	authors: Author[];
}

export interface CourseCardProps {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	author: Author[];
}
