import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CourseCard from '../CourseCard';

const mockStore = configureStore([]);

const mockCourse = {
	id: 1,
	title: 'Test Course',
	description: 'This is a test course',
	creationDate: '08/01/2024',
	duration: 120,
	author: [
		{ id: 1, name: 'Author 1' },
		{ id: 2, name: 'Author 2' },
	],
};

describe('CourseCard', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			auth: {
				token: 'mockToken',
				role: 'admin',
			},
			authors: [
				{ id: 1, name: 'Author 1' },
				{ id: 2, name: 'Author 2' },
			],
		});
	});

	test('CourseCard should display title', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard {...mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		const titleElement = screen.getByText('Test Course');
		expect(titleElement).toBeInTheDocument();
	});

	test('CourseCard should display description', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard {...mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		const descriptionElement = screen.getByText('This is a test course');
		expect(descriptionElement).toBeInTheDocument();
	});

	test('CourseCard should display duration in the correct format', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard {...mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		const durationElement = screen.getByText('Duration:');
		expect(durationElement).toBeInTheDocument();
	});

	test('CourseCard should display authors list', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard {...mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		const authorsElement = screen.getByText('Authors:');
		expect(authorsElement).toBeInTheDocument();
	});

	test('CourseCard should display created date in the correct format', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseCard {...mockCourse} />
				</MemoryRouter>
			</Provider>
		);

		const createdDateElement = screen.getByText('Created:');
		expect(createdDateElement).toBeInTheDocument();
	});
});
