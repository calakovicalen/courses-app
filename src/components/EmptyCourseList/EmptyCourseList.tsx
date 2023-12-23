import React from 'react';
import Button from 'src/common/Button/Button';

import './EmptyCourseList.css';

function EmptyCourseList() {
	return (
		<section className='empty__container'>
			<h2>Your List Is Empty</h2>
			<p>Please use 'Add New Course' button to add your first course</p>
			<Button
				buttonText='Add new course'
				onClick={() => {
					console.log('add new course');
				}}
			/>
		</section>
	);
}

export default EmptyCourseList;
