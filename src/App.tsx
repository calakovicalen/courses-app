import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';

import './App.css';
import { validateTokenAsync } from './store/user/thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';

function App() {
	const { isAuth } = useSelector((state: RootState) => state.auth);

	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();

	useEffect(() => {
		const checkLocalStorageToken = async () => {
			const storedToken = localStorage.getItem('userToken');
			await dispatch(validateTokenAsync(storedToken));
			if (storedToken) {
				navigate('/courses');
			} else {
				navigate('/login');
			}
		};

		if (!isAuth) {
			checkLocalStorageToken();
		}
	}, [dispatch, isAuth]);

	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/courses' element={<Courses />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />
				<Route path='courses/add' element={<CourseForm />} />
				<Route path='courses/update/:courseId' element={<CourseForm />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Registration />} />
			</Routes>
		</div>
	);
}

export default App;
