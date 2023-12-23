import React from 'react';

import Button from 'src/common/Button/Button';

import { CourseCardProps } from '../../Courses.type';
import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { useNavigate } from 'react-router-dom';

import './CourseCard.css';
function CourseCard({
	id,
	title,
	description,
	creationDate,
	duration,
	author,
}: CourseCardProps) {
	const navigate = useNavigate();

	return (
		<div className='course-card__container'>
			<div className='course-card__box--1'>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className='course-card__box--2'>
				<div className='text-container'>
					<p>
						<span>Authors:</span> {author.map((a) => `${a.name}, `)}
					</p>
					<p>
						<span>Duration:</span> {getCourseDuration(duration)}
					</p>
					<p>
						<span>Created:</span> {creationDate}
					</p>
				</div>

				<Button
					buttonText='show course'
					onClick={() => {
						navigate(`/courses/${id}`);
					}}
				/>
			</div>
		</div>
	);
}

export default CourseCard;
