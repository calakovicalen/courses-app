import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import { mockedCoursesList, mockedAuthorsList } from 'src/constants';

import './App.css';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	const userToken = localStorage.getItem('userToken');
	const navigate = useNavigate();

	useEffect(() => {
		if (userToken) {
			navigate('/courses');
		}
	}, [userToken]);

	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route
					path='/courses'
					element={
						<Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
					}
				/>
				<Route path='courses/:courseId' element={<CourseInfo />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Registration />} />
			</Routes>
		</div>
	);
}

export default App;
