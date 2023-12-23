import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import { mockedCoursesList, mockedAuthorsList } from 'src/constants';

import './App.css';

function App() {
	return (
		<div className='app'>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route
						path='/courses'
						element={
							<Courses
								courses={mockedCoursesList}
								authors={mockedAuthorsList}
							/>
						}
					/>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Registration />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
