import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { formatCreationDate } from 'src/helpers/formatCreationDate';

import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';

import './CreateCourse.css';
import { useDispatch } from 'react-redux';
import { addNewCourseAction } from 'src/store/courses/actions';
import { addNewAuthorAction } from 'src/store/authors/actions';
import { AuthorType } from 'src/store/authors/types';

function CreateCourse() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authors, setAuthors] = useState([]);
	const [courseAuthors, setCourseAuthors] = useState<AuthorType[]>([]);
	const [newAuthor, setNewAuthor] = useState('');
	const [duration, setDuration] = useState('');

	const [errors, setErrors] = useState({
		title: false,
		description: false,
		duration: false,
		authors: false,
	});

	const newErrors = {
		title: title.length === 0,
		description: description.length === 0,
		duration: duration.length === 0,
		authors: courseAuthors.length === 0,
	};

	const handleCreateAuthor = () => {
		if (newAuthor.trim() === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				authors: true,
			}));
			return;
		}

		const newAuthorObj = { id: uuid(), name: newAuthor };
		setAuthors([...authors, newAuthorObj]);
		setNewAuthor('');

		setErrors((prevErrors) => ({
			...prevErrors,
			authors: false,
		}));
	};

	const handleAddAuthor = (author) => {
		setAuthors(authors.filter((a) => a.id !== author.id));
		setCourseAuthors([...courseAuthors, author]);
		dispatch(addNewAuthorAction(author));
	};

	const handleDeleteAuthor = (author) => {
		setAuthors(authors.filter((a) => a.id !== author.id));
	};

	const handleCreateCourse = (e) => {
		e.preventDefault();

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const newCourseObj = {
			id: uuid(),
			title,
			description,
			duration: Number(duration),
			authors: courseAuthors,
			creationDate: formatCreationDate(),
		};

		dispatch(addNewCourseAction(newCourseObj));
		navigate('/courses');
	};

	const handleDurationChange = (event) => {
		const newDuration = event.target.value;
		setDuration(newDuration);

		setErrors((prevErrors) => ({
			...prevErrors,
			duration: newDuration.length === 0,
		}));
	};

	const handleNewAuthorChange = (event) => {
		const newAuthorName = event.target.value;
		setNewAuthor(newAuthorName);

		setErrors((prevErrors) => ({
			...prevErrors,
			authors: courseAuthors.length === 0 && newAuthorName.length === 0,
		}));
	};

	return (
		<section className='create-course__container'>
			<h2>Course Edit/Create Page</h2>
			<form onSubmit={handleCreateCourse}>
				<div className='create-course__form-container'>
					<h3 className='form__header col-1'>Main Info</h3>
					<Input
						inputName='Title'
						inputType='text'
						inputValue={title}
						onChange={(event) => setTitle(event.target.value)}
						error={errors.title}
						className='col-2'
					/>
					<Input
						inputName='Description'
						inputType='textarea'
						inputValue={description}
						onChange={(event) => setDescription(event.target.value)}
						error={errors.description}
						className='col-3'
					/>
					<h3 className='form__header col-4'>Duration</h3>
					<div className='col-5'>
						<Input
							inputName='duration'
							inputType='number'
							inputValue={duration}
							onChange={handleDurationChange}
							error={errors.duration}
						/>
						<p>{getCourseDuration(Number(duration))}</p>
					</div>
					<div className='col-6'>
						<h3 className='form__header '>Authors</h3>
						<div className='col-6__container'>
							<Input
								inputName='Author name'
								inputType='text'
								inputValue={newAuthor}
								onChange={handleNewAuthorChange}
								error={errors.authors}
							/>
							<Button
								buttonText='Create Author'
								type='button'
								onClick={handleCreateAuthor}
							/>
						</div>
					</div>

					<div className='col-7'>
						<ul className='col-7__list'>
							<h3 className='form__header '>Course Authors</h3>
							{courseAuthors.length === 0
								? 'Authors list is empty'
								: courseAuthors.map((author) => (
										<li key={author.id}>{author.name}</li>
									))}
						</ul>
					</div>

					<div className='col-8'>
						{authors.length !== 0 && <h4>Authors List</h4>}
						<ul className='col-8__list'>
							{authors.map((author) => (
								<AuthorItem
									key={author.id}
									author={author}
									onAdd={handleAddAuthor}
									onDelete={handleDeleteAuthor}
								/>
							))}
						</ul>
					</div>
				</div>

				<div className='form__button-container'>
					<Button
						buttonText='Cancel'
						onClick={(e) => {
							e.preventDefault();
							navigate(-1);
						}}
					/>
					<Button buttonText='Create Course' type='submit' />
				</div>
			</form>
		</section>
	);
}

export default CreateCourse;
