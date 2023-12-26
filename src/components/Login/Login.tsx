import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'src/common/Button/Button';
import Form from 'src/common/Form/Form';
import Input from 'src/common/Input/Input';
import { usePostUser } from 'src/hooks/usePostUser';

function Login({ onAddToken }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});
	const navigate = useNavigate();

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();

		const newErrors = {
			email: email.length === 0,
			password: password.length === 0,
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const newUser = {
			password,
			email,
		};

		const result = await usePostUser('login', newUser);

		if (result.successful) {
			alert('Successfuly logged in');
			setEmail('');
			setPassword('');
			onAddToken(
				'userToken',
				result.user.name ? result.user.name : result.user.email
			);
			navigate('/courses');
		} else {
			alert(result.errors[0]);
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
			<Button buttonText='Login' type='submit' />

			<p>
				If you don't have an account you may <br />{' '}
				<Link to='/register'>Register</Link>
			</p>
		</Form>
	);
}

export default Login;
