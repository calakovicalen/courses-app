import React from 'react';
import CourseCard from '../CourseCard/CourseCard';
import { getAuthorNames } from 'src/helpers/getAuthorsForCourses';
import { Author } from 'src/constants';

function CoursesList({ courses }) {
	return (
		<>
			{courses.map((course) => {
				const { id, title, description, creationDate, duration } = course;
				const authorNames: Author[] = getAuthorNames(course);

				return (
					<CourseCard
						key={id}
						id={id}
						title={title}
						description={description}
						creationDate={creationDate}
						duration={duration}
						author={authorNames}
					/>
				);
			})}
		</>
	);
}

export default CoursesList;
