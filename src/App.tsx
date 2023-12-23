import React from 'react';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';

import { mockedCoursesList, mockedAuthorsList } from 'src/constants';

function App() {
	return (
		<div>
			<Header />
			<Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
		</div>
	);
}

export default App;
