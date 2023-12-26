import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseDuration } from 'src/helpers/getCourseDuration';

import './CourseInfo.css';
import Button from 'src/common/Button/Button';

function CourseInfo({ courses, authors }) {
	const { courseId } = useParams();
	const course = courses.find((course) => course.id === courseId);

	const {
		id,
		title,
		description,
		duration,
		creationDate,
		authors: authorsIds,
	} = course;

	const authorsList = authors.filter((author) =>
		authorsIds.includes(author.id)
	);

	console.log(authorsList);

	const navigate = useNavigate();

	return (
		<div className='course-info__container'>
			<h2>{title}</h2>
			<div className='content__container'>
				<div className='box-1'>
					<h3>Description:</h3>
					<p>{description}</p>
				</div>

				<div className='divider'></div>

				<div className='box-2'>
					<div className='box-2__col1'>
						<p>ID:</p>
						<p>Duration:</p>
						<p>Created:</p>
						<p>Authors:</p>
					</div>
					<div className='box-2__col2'>
						<p>{id}</p>
						<p>
							<span>{getCourseDuration(duration)}</span>
						</p>
						<p>{creationDate}</p>
						<p>{authorsList.map((author) => `${author.name}, `)}</p>
					</div>
				</div>
			</div>
			<Button buttonText='Back' onClick={() => navigate('/courses')} />
		</div>
	);
}

export default CourseInfo;
