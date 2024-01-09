import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

import './App.css';
import { loginSuccess, logout } from './store/user/actions';
import { validateToken } from './services';

function App() {
	const [isToken, setIsToken] = useState(false);
	const { token, isAuth } = useSelector((state: RootState) => state.auth);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const item = localStorage.getItem('userToken');
		setIsToken(item !== null);

		if (isToken) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, [isToken, setIsToken]);

	useEffect(() => {
		const checkLocalStorageToken = async () => {
			const storedToken = localStorage.getItem('userToken');

			if (storedToken) {
				try {
					const user = await validateToken(storedToken);

					dispatch(loginSuccess(storedToken, user));
				} catch (error) {
					dispatch(logout());
				}
			}
		};

		if (!isAuth) {
			// If the user is not already authenticated, check the local storage for a token.
			checkLocalStorageToken();
		}
	}, [dispatch, isAuth]);

	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/courses' element={<Courses />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />
				<Route path='courses/add' element={<CreateCourse />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Registration />} />
			</Routes>
		</div>
	);
}

export default App;
