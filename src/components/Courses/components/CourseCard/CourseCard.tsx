import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { deleteCourseAction } from 'src/store/courses/actions';
import { CourseCardProps } from '../../Courses.type';

import Button from 'src/common/Button/Button';
import Trash from 'src/assets/Trash';
import Pen from 'src/assets/Pen';
import './CourseCard.css';

const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	author: authors,
}: CourseCardProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleShowCourse = () => navigate(`/courses/${id}`);
	const handleDeleteCourse = () => dispatch(deleteCourseAction(id));
	const handleEditCourse = () => console.log('edit');

	return (
		<div className='course-card__container'>
			<div className='course-card__box--1'>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
			<div className='course-card__box--2'>
				<div className='text-container'>
					<p>
						<span>Authors:</span>
						{authors.map((author, index) => (
							<React.Fragment key={index}>
								{index < authors.length - 1 ? (
									<>{` ${author.name}, `}</>
								) : (
									<>{` ${author.name}`}</>
								)}
							</React.Fragment>
						))}
					</p>
					<p>
						<span>Duration:</span> {getCourseDuration(duration)}
					</p>
					<p>
						<span>Created:</span> {creationDate}
					</p>
				</div>

				<div className='buttons-container'>
					<Button onClick={handleShowCourse}>Show course</Button>
					<Button onClick={handleDeleteCourse}>
						<Trash />
					</Button>
					<Button onClick={handleEditCourse}>
						<Pen />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
