import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { RootState } from 'src/store/rootReducer';
import { CourseCardProps } from '../../Courses.type';

import Button from 'src/common/Button/Button';
import Trash from 'src/assets/Trash';
import Pen from 'src/assets/Pen';
import './CourseCard.css';
import { deleteCourseThunk } from 'src/store/courses/thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';

const CourseCard = ({
	id,
	title,
	description,
	creationDate,
	duration,
	author,
}: CourseCardProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();

	const { token, role } = useSelector((state: RootState) => state.auth);
	const authors = useSelector((state: RootState) => state.authors);
	const filteredAuthors = authors.filter((a) =>
		author.some((author) => String(author) === a.id)
	);

	const handleShowCourse = () => navigate(`/courses/${id}`);

	const handleDeleteCourse = () => dispatch(deleteCourseThunk(id, token));

	const handleEditCourse = () => navigate(`/courses/update/${id}`);

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
						{filteredAuthors.map((author, index) => (
							<React.Fragment key={index}>
								{index < filteredAuthors.length - 1 ? (
									<>{` ${author?.name}, `}</>
								) : (
									<>{` ${author?.name}`}</>
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
					{role === 'admin' ? (
						<>
							<Button onClick={handleDeleteCourse}>
								<Trash />
							</Button>
							<Button onClick={handleEditCourse}>
								<Pen />
							</Button>
						</>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
