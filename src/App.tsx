import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import './App.css';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

function App() {
	const [isToken, setIsToken] = useState(false);
	const navigate = useNavigate();

	const handleRemoveToken = () => {
		localStorage.removeItem('userToken');
		setIsToken(false);
	};

	const handleAddToken = (key, value) => {
		localStorage.setItem(key, value);
		setIsToken(true);
	};

	useEffect(() => {
		const item = localStorage.getItem('userToken');
		setIsToken(item !== null);

		if (isToken) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, [isToken, setIsToken]);

	return (
		<div className='app'>
			<Header token={isToken} onRemoveToken={handleRemoveToken} />
			<Routes>
				<Route path='/courses' element={<Courses />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />
				<Route path='courses/add' element={<CreateCourse />} />
				<Route path='login' element={<Login onAddToken={handleAddToken} />} />
				<Route path='register' element={<Registration />} />
			</Routes>
		</div>
	);
}

export default App;
