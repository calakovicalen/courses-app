import { Author } from 'src/constants';

export function getAuthorNames(course): Author[] {
	return course.authors.map((author) => author);
}
