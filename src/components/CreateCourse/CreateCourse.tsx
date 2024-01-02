import React, { useState } from 'react';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addCourseAction } from 'src/store/courses/actions';
import { addNewAuthorAction } from 'src/store/authors/actions';
import { AuthorType } from 'src/store/authors/types';
import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { formatCreationDate } from 'src/helpers/formatCreationDate';
import { RootState } from 'src/store/rootReducer';
import { addAuthor, addCourse } from 'src/services';

import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';

import './CreateCourse.css';

const CreateCourse = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = useSelector((state: RootState) => state.auth);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		duration: '',
		newAuthor: '',
	});

	const [authors, setAuthors] = useState<AuthorType[]>([]);
	const [courseAuthors, setCourseAuthors] = useState<AuthorType[]>([]);

	const [errors, setErrors] = useState({
		title: false,
		description: false,
		duration: false,
		authors: false,
	});

	const handleInputChange = (name, value) => {
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCreateAuthor = () => {
		const { newAuthor } = formData;

		if (newAuthor.trim() === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				authors: true,
			}));
			return;
		}

		const newAuthorObj = { id: uuid(), name: newAuthor };
		setAuthors([...authors, newAuthorObj]);
		setFormData((prevData) => ({
			...prevData,
			newAuthor: '',
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			authors: false,
		}));
	};

	const handleAddAuthor = async (author) => {
		setAuthors((prevAuthors) => prevAuthors.filter((a) => a.id !== author.id));
		setCourseAuthors((prevCourseAuthors) => [...prevCourseAuthors, author]);
		const data = await addAuthor(author, token);
		console.log(data);
		dispatch(addNewAuthorAction(author));
	};

	const handleDeleteAuthor = (author) => {
		setAuthors((prevAuthors) => prevAuthors.filter((a) => a.id !== author.id));
	};

	const handleCreateCourse = async (e) => {
		try {
			e.preventDefault();

			const { title, description, duration } = formData;

			const newErrors = {
				title: title.length === 0,
				description: description.length === 0,
				duration: duration.length === 0,
				authors: courseAuthors.length === 0,
			};

			setErrors(newErrors);

			if (Object.values(newErrors).some((error) => error)) {
				return;
			}

			const authorIds = courseAuthors.map((author) => author.id);

			const newCourseObj = {
				id: uuid(),
				title,
				description,
				duration: Number(duration),
				authors: authorIds,
				creationDate: formatCreationDate(),
			};
			console.log(newCourseObj);
			const data = await addCourse(newCourseObj, token);
			console.log(data);

			dispatch(addCourseAction(newCourseObj));
			navigate('/courses');
		} catch (error) {
			console.error('Error creating course:', error);
		}
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
						inputValue={formData.title}
						onChange={(event) => handleInputChange('title', event.target.value)}
						error={errors.title}
						className='col-2'
					/>
					<Input
						inputName='Description'
						inputType='textarea'
						inputValue={formData.description}
						onChange={(event) =>
							handleInputChange('description', event.target.value)
						}
						error={errors.description}
						className='col-3'
					/>
					<h3 className='form__header col-4'>Duration</h3>
					<div className='col-5'>
						<Input
							inputName='duration'
							inputType='number'
							inputValue={formData.duration}
							onChange={(event) =>
								handleInputChange('duration', event.target.value)
							}
							error={errors.duration}
						/>
						<p>{getCourseDuration(Number(formData.duration))}</p>
					</div>
					<div className='col-6'>
						<h3 className='form__header '>Authors</h3>
						<div className='col-6__container'>
							<Input
								inputName='Author name'
								inputType='text'
								inputValue={formData.newAuthor}
								onChange={(event) =>
									handleInputChange('newAuthor', event.target.value)
								}
								error={errors.authors}
							/>
							<Button type='button' onClick={handleCreateAuthor}>
								Create Author
							</Button>
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
						onClick={(e) => {
							e.preventDefault();
							navigate(-1);
						}}
					>
						Cancel
					</Button>
					<Button type='submit'>Create Course</Button>
				</div>
			</form>
		</section>
	);
};

export default CreateCourse;
