import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { RootState } from 'src/store/rootReducer';

import Button from 'src/common/Button/Button';
import Form from 'src/common/Form/Form';
import Input from 'src/common/Input/Input';
import { login } from 'src/store/user/thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
	const { loading } = useSelector((state: RootState) => state.auth);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {
			email: email.length === 0,
			password: password.length === 0,
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		try {
			await dispatch(login(email, password));
			navigate('/courses');
		} catch (error) {
			console.error('Error during login', error);
		}
	};

	return (
		<Form header='Login' onSubmit={handleSubmit}>
			<Input
				inputName='email'
				inputType='email'
				inputValue={email}
				error={errors.email}
				onChange={(event) => setEmail(event.target.value)}
			/>
			<Input
				inputName='password'
				inputType='password'
				inputValue={password}
				error={errors.password}
				onChange={(event) => setPassword(event.target.value)}
			/>
			<Button type='submit'>{loading ? 'Logging in...' : 'Login'}</Button>

			<p>
				If you don't have an account you may <br />
				<Link to='/register'>Register</Link>
			</p>
		</Form>
	);
};

export default Login;
