import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';

import Button from 'src/common/Button/Button';

import './EmptyCourseList.css';

const EmptyCourseList = () => {
	const navigate = useNavigate();
	const { role } = useSelector((state: RootState) => state.auth);

	const handleAddCourse = () => {
		navigate('/courses/add');
	};

	return (
		<section className='empty__container'>
			{role === 'admin' ? (
				<>
					<h2>Your List Is Empty</h2>
					<p>Please use the 'Add New Course' button to add your first course</p>
					<Button onClick={handleAddCourse}>Add new course</Button>
				</>
			) : (
				<p>
					You don't have permissions to create a course. Please log in as ADMIN
				</p>
			)}
		</section>
	);
};

export default EmptyCourseList;
