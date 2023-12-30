import { Author } from 'src/constants';
import { CourseType } from 'src/store/courses/types';

export function getAuthorNames(course: CourseType): Author[] {
	return course.authors.map((author) => author);
}
