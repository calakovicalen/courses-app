import React from 'react';

import { getAuthorNames } from 'src/helpers/getAuthorsForCourses';

import CourseCard from '../CourseCard/CourseCard';

function CoursesList({ courses }) {
	return (
		<>
			{courses.map((course) => {
				const { id, title, description, creationDate, duration } = course;
				const authorNames = getAuthorNames(course);

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
