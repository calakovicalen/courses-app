import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';
import SearchBar from './components/SearchBar/SearchBar';
import Button from 'src/common/Button/Button';

import { CoursesProps } from './Courses.type';
import { Course } from 'src/constants';

import './Courses.css';

function Courses({ courses, authors }: CoursesProps) {
	const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
	const navigate = useNavigate();

	const handleSearch = (searchQuery: string) => {
		const lowerCaseQuery = searchQuery.toLowerCase();

		const filtered = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(lowerCaseQuery) ||
				course.id.toString().includes(lowerCaseQuery)
		);

		setFilteredCourses(filtered);
	};

	return (
		<section className='courses'>
			{courses.length === 0 ? (
				<EmptyCourseList />
			) : (
				<>
					<div className='searchbar__container'>
						<SearchBar onSearch={handleSearch} />
						<Button
							buttonText='add new course'
							onClick={() => navigate('/courses/add')}
						/>
					</div>
					{filteredCourses.map((course) => {
						const { id, title, description, creationDate, duration } = course;

						return (
							<CourseCard
								key={id}
								id={id}
								title={title}
								description={description}
								creationDate={creationDate}
								duration={duration}
								author={authors}
							/>
						);
					})}
				</>
			)}
		</section>
	);
}

export default Courses;
