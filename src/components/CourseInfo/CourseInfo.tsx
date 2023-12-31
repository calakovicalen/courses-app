import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { getAuthorNames } from 'src/helpers/getAuthorsForCourses';
import { RootState } from 'src/store/rootReducer';

import Button from 'src/common/Button/Button';
import './CourseInfo.css';

function CourseInfo() {
	const { courseId } = useParams();
	const courses = useSelector((state: RootState) => state.courses);
	const course = courses.find((c) => c.id === courseId);
	const authorNames = getAuthorNames(course);
	const { id, title, description, duration, creationDate } = course;

	const navigate = useNavigate();

	if (!course) {
		return <div>Course not found.</div>;
	}

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
						<p>
							{authorNames.map((author, index) => (
								<React.Fragment key={index}>
									{index < authorNames.length - 1 ? (
										<>{`${author.name}, `}</>
									) : (
										<>{`${author.name}`}</>
									)}
								</React.Fragment>
							))}
						</p>
					</div>
				</div>
			</div>
			<Button onClick={() => navigate('/courses')}>Back</Button>
		</div>
	);
}

export default CourseInfo;
