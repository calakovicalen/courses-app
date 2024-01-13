import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AuthorType } from 'src/store/authors/types';
import { getCourseDuration } from 'src/helpers/getCourseDuration';
import { formatCreationDate } from 'src/helpers/formatCreationDate';
import { RootState } from 'src/store/rootReducer';
import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import AuthorItem from './components/AuthorItem/AuthorItem';
import './CourseForm.css';
import { addAuthorThunk, deleteAuthorThunk } from 'src/store/authors/thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { addCourseThunk, updateCourseThunk } from 'src/store/courses/thunk';

const CourseForm = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
	const { token } = useSelector((state: RootState) => state.auth);
	const authors = useSelector((state: RootState) => state.authors);
	const courses = useSelector((state: RootState) => state.courses);
	const [isUpdateMode, setIsUpdateMode] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		duration: '',
		newAuthor: '',
	});
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

		dispatch(addAuthorThunk({ name: newAuthor }, token));
		setFormData((prevData) => ({
			...prevData,
			newAuthor: '',
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			authors: false,
		}));
	};

	const handleAddAuthor = (author) => {
		setCourseAuthors((prevCourseAuthors) => [...prevCourseAuthors, author]);
	};

	const handleDeleteAuthor = (author) => {
		setCourseAuthors((prevCourseAuthors) =>
			prevCourseAuthors.filter((a) => a.id !== author.id)
		);
		dispatch(deleteAuthorThunk(author.id, token));
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

			const authorIds: string[] = courseAuthors.map((author) => author.id);

			const newCourseObj = {
				id: courseId ? courseId : '',
				title,
				description,
				duration: Number(duration),
				authors: authorIds,
				creationDate: formatCreationDate(),
			};

			if (isUpdateMode) {
				await dispatch(updateCourseThunk(newCourseObj, token));
				navigate('/courses');
			} else {
				await dispatch(addCourseThunk(newCourseObj, token));
				navigate('/courses');
			}
		} catch (error) {
			console.error('Error creating course:', error);
		}
	};

	useEffect(() => {
		if (courseId) {
			setIsUpdateMode(true);
		}
	}, [courseId, isUpdateMode]);

	useEffect(() => {
		if (isUpdateMode) {
			const singleCourse = courses.find((course) => course.id === courseId);
			if (singleCourse) {
				setFormData({
					title: singleCourse.title,
					description: singleCourse.description,
					duration: singleCourse.duration.toString(),
					newAuthor: '',
				});
				setCourseAuthors(
					authors.filter((author) => singleCourse.authors.includes(author.id))
				);
			}
		}
	}, [isUpdateMode]);

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
					<Button type='submit'>
						{courseId ? 'Save Changes' : 'Create Course'}
					</Button>
				</div>
			</form>
		</section>
	);
};

export default CourseForm;
