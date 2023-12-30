import React from 'react';
import Button from 'src/common/Button/Button';

import './EmptyCourseList.css';
import { useNavigate } from 'react-router-dom';

function EmptyCourseList() {
	const navigate = useNavigate();

	return (
		<section className='empty__container'>
			<h2>Your List Is Empty</h2>
			<p>Please use 'Add New Course' button to add your first course</p>
			<Button
				buttonText='add new course'
				onClick={() => navigate('/courses/add')}
			/>
		</section>
	);
}

export default EmptyCourseList;
