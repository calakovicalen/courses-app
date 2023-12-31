import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'src/common/Button/Button';

import './EmptyCourseList.css';

const EmptyCourseList = () => {
	const navigate = useNavigate();

	const handleAddCourse = () => {
		navigate('/courses/add');
	};

	return (
		<section className='empty__container'>
			<h2>Your List Is Empty</h2>
			<p>Please use the 'Add New Course' button to add your first course</p>
			<Button onClick={handleAddCourse}>Add new course</Button>
		</section>
	);
};

export default EmptyCourseList;
