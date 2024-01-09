import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'src/store/rootReducer';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header';

describe('Header component', () => {
	it("renders logo and user's name when authenticated", () => {
		const store = configureStore({
			reducer: rootReducer,
			preloadedState: {
				auth: {
					token: 'yourToken',
					name: 'John Doe',
					email: 'john@example.com',
					isAuth: true,
				},
			},
		});

		const { getByText, getByAltText } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		);

		const logo = getByAltText('logo of company');
		expect(logo).toBeInTheDocument();

		const userName = getByText('John Doe');
		expect(userName).toBeInTheDocument();
	});
});
