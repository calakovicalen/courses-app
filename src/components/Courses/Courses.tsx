import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/store/rootReducer';
import { CourseType } from 'src/store/courses/types';

import SearchBar from './components/SearchBar/SearchBar';
import Button from 'src/common/Button/Button';
import CoursesList from './components/CoursesList/CoursesList';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

import './Courses.css';
import { fetchCourses } from 'src/services';
import { getCoursesAction } from 'src/store/courses/actions';

function Courses() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const courses = useSelector((state: RootState) => state.courses);

	const [filteredCourses, setFilteredCourses] = useState<CourseType[]>(courses);

	const handleSearch = (searchQuery: string) => {
		const lowerCaseQuery = searchQuery.toLowerCase();

		const filtered = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(lowerCaseQuery) ||
				course.id.toString().includes(lowerCaseQuery)
		);

		setFilteredCourses(filtered);
	};

	const getCourses = async () => {
		const data = await fetchCourses();
		dispatch(getCoursesAction(data.result));
	};

	useEffect(() => {
		getCourses();
	}, []);

	const renderContent = () => {
		if (courses.length === 0) {
			return <EmptyCourseList />;
		}

		return (
			<>
				<div className='searchbar__container'>
					<SearchBar onSearch={handleSearch} />
					<Button onClick={() => navigate('/courses/add')}>
						Add new course
					</Button>
				</div>
				<CoursesList courses={courses} />
			</>
		);
	};

	return <section className='courses'>{renderContent()}</section>;
}

export default Courses;
