import React, { useState } from 'react';
import Input from 'src/common/Input/Input';

function CreateCourse() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState('');
	const [authors, setAuthors] = useState([]);

	const [errors, setErrors] = useState({
		name: false,
		description: false,
		duration: false,
		authors: false,
	});

	const newErrors = {
		name: name.length === 0,
		description: description.length === 0,
		duration: duration.length === 0,
		authors: authors.length === 0,
	};

	return (
		<section className='create-course__container'>
			<h2>Course Edit/Create Page</h2>
			<div className='create-course__form-container'>
				<h3>Main Info</h3>
				<Input
					inputName='Title'
					inputType='text'
					inputValue={name}
					onChange={(event) => setName(event.target.value)}
					error={errors.name}
				/>
				<Input
					inputName='Description'
					inputType='textarea'
					inputValue={description}
					onChange={(event) => setDescription(event.target.value)}
					error={errors.description}
				/>
				<h3>Duration</h3>
				<Input
					inputName='duration'
					inputType='number'
					inputValue={duration}
					onChange={(event) => setDuration(event.target.value)}
					error={errors.duration}
				/>
				<Input
					inputName='Author name'
					inputType='number'
					inputValue={authors}
					onChange={(event) => setAuthors([...authors, event.target.value])}
					error={errors.authors}
				/>
			</div>
		</section>
	);
}

export default CreateCourse;
