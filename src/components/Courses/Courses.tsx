import React, { useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

import { CoursesProps } from './Courses.type';
import { Course } from 'src/constants';

import './Courses.css';
import SearchBar from './components/SearchBar/SearchBar';

function Courses({ courses, authors }: CoursesProps) {
	const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

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
					<SearchBar onSearch={handleSearch} />
					{filteredCourses.map((course) => {
						const { id, title, description, creationDate, duration } = course;

						return (
							<CourseCard
								key={id}
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
