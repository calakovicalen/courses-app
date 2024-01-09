/* eslint-disable no-undef */
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {
	MemoryRouter,
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Courses from '../Courses';
import CourseForm from '../../CourseForm/CourseForm';

afterEach(cleanup);

const mockedState = {
	user: {
		isAuth: true,
		name: 'admin',
		email: 'admin@admin.com',
		token: 'admin',
		role: 'admin',
	},
	courses: [
		{
			id: '1',
			title: 'Course Title',
			description: 'Course description',
			creationDate: '1/2/2001',
			duration: 90,
			authors: ['author1', 'author2', 'author3'],
		},
	],
	authors: [
		{ id: 'author1', name: 'author name 1' },
		{ id: 'author2', name: 'author name 2' },
		{ id: 'author3', name: 'author name 3' },
	],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Courses', () => {
	it('should render as much CourseCard components as the amount of object in courses array', () => {
		const { container } = render(
			<Provider store={mockedStore}>
				<Router>
					<Courses />
				</Router>
			</Provider>
		);
		expect(
			container.getElementsByClassName('course-card__container').length
		).toBe(mockedState.courses.length);
	});

	it('should render CourseForm component after a click on the "Add new course" button', async () => {
		render(
			<Provider store={mockedStore}>
				<MemoryRouter initialEntries={['/courses']}>
					<Routes>
						<Route path='/courses' element={<Courses />} />
						<Route path='/courses/add' element={<CourseForm />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
		expect(screen.getByTestId('add-new-course')).toBeInTheDocument();
		fireEvent.click(screen.getByTestId('add-new-course'));
		expect(screen.getByText('Course Edit/Create Page')).toBeInTheDocument();
	});
});
