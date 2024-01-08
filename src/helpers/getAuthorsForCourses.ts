import { Author } from 'src/constants';

export function getAuthorNames(course): Author[] {
	if (course && course.authors) {
		return course.authors.map((author) => author);
	} else {
		return [];
	}
}
