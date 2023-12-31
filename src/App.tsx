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
	const [data1, setData] = useState();
	const navigate = useNavigate();

	const handleRemoveToken = () => {
		localStorage.removeItem('userToken');
		setIsToken(false);
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

	useEffect(() => {
		const getUser = async () => {
			const response = await fetch('http://localhost:4000/users/me', {
				method: 'GET',
				headers: {
					Authorization:
						'Bearer gEA/IZPWkQ/d6Ypd5Ber4gzb/i4XURets/nz/CqLDNLFYu9DtHS4YtDq8cOuqSMrA2NXMMPcIddCZrCDz+M8thMboCazGejuyjcdStvOCOFxDPrquyZ9QIDUa0Zdh7zjb1tjvSEjJZIXbREnsZ/JRhdgAYD2hutf3+0ZXWj9HR/122ntyQVBSzgu4f2gztHS215OgOi+vb1Jkirjr2rfcWvbc5rczRwabc5j0S28mto0O6tUGivKziacIAjTOdXKtoB4nDPM3vyA2Cy1Ltvsff/gSh1aWLkeCZGcoSSa1mryzKBaGtu92JbVH/0i+QX1uR3fKMOGbnThXNQ/e+1HYQ==',
				},
			});

			const data = await response.json();

			setData(data);
		};

		getUser();
	}, [setData]);

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
