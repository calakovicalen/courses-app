import React, { useState } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

import { CoursesProps } from './Courses.type';
import { Course } from 'src/constants';

import './Courses.css';
import SearchBar from './components/SearchBar/SearchBar';
import CourseInfo from '../CourseInfo/CourseInfo';

function Courses({ courses, authors }: CoursesProps) {
	const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

	const handleSearch = (searchQuery: string) => {
		const lowerCaseQuery = searchQuery.toLowerCase();

		const filtered = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(lowerCaseQuery) ||
				course.id.toString().includes(lowerCaseQuery)
		);

		setFilteredCourses(filtered);
	};

	const handleShowCourseInfo = (course: Course) => {
		setSelectedCourse(course === selectedCourse ? null : course);
	};

	const handleBack = () => {
		setSelectedCourse(null);
	};

	return (
		<section className='courses'>
			{courses.length === 0 ? (
				<EmptyCourseList />
			) : (
				<>
					{!selectedCourse && <SearchBar onSearch={handleSearch} />}
					{selectedCourse ? (
						<CourseInfo course={selectedCourse} onBack={handleBack} />
					) : (
						filteredCourses.map((course) => {
							const { id, title, description, creationDate, duration } = course;

							return (
								<CourseCard
									key={id}
									title={title}
									description={description}
									creationDate={creationDate}
									duration={duration}
									author={authors}
									onClick={() => handleShowCourseInfo(course)}
								/>
							);
						})
					)}
				</>
			)}
		</section>
	);
}

export default Courses;
