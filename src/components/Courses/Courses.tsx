import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/store/rootReducer';
import { CourseType } from 'src/store/courses/types';

import SearchBar from './components/SearchBar/SearchBar';
import Button from 'src/common/Button/Button';
import CoursesList from './components/CoursesList/CoursesList';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

import './Courses.css';
import { fetchAuthorsThunk } from 'src/store/authors/thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { fetchCoursesThunk } from 'src/store/courses/thunk';

function Courses() {
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
	const courses = useSelector((state: RootState) => state.courses);
	const { role } = useSelector((state: RootState) => state.auth) ?? {
		role: '',
	};
	const [filteredCourses, setFilteredCourses] = useState<CourseType[]>(courses);

	useEffect(() => {
		setFilteredCourses(courses);
	}, [courses]);

	const handleSearch = (searchQuery: string) => {
		const lowerCaseQuery = searchQuery.toLowerCase();

		const filtered = courses.filter(
			(course) =>
				course.title.toLowerCase().includes(lowerCaseQuery) ||
				course.id.toString().includes(lowerCaseQuery)
		);

		setFilteredCourses(filtered);
	};

	useEffect(() => {
		dispatch(fetchAuthorsThunk());
		dispatch(fetchCoursesThunk());
	}, [dispatch]);

	const renderContent = () => {
		if (filteredCourses.length === 0) {
			return <EmptyCourseList />;
		}

		return (
			<>
				<div className='searchbar__container'>
					<SearchBar onSearch={handleSearch} />

					<Link to={'/courses/add'} data-testid='add-new-course'>
						<Button>Add new course</Button>
					</Link>
				</div>
				<CoursesList courses={filteredCourses} />
			</>
		);
	};

	return <section className='courses'>{renderContent()}</section>;
}

export default Courses;
