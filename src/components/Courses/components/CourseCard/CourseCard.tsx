import React from 'react';

import Button from 'src/common/Button/Button';
import { CourseCardProps } from '../../Courses.type';

import './CourseCard.css';

function CourseCard({
	title,
	description,
	creationDate,
	duration,
	author,
}: CourseCardProps) {
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
						<span>Duration:</span> {duration}
					</p>
					<p>
						<span>Created:</span> {creationDate}
					</p>
				</div>

				<Button
					buttonText='show course'
					onClick={() => {
						console.log('show course');
					}}
				/>
			</div>
		</div>
	);
}

export default CourseCard;
