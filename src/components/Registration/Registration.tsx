import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostUser } from 'src/hooks/usePostUser';
import { User } from './Registration.type';

import Button from 'src/common/Button/Button';
import Input from 'src/common/Input/Input';
import Form from 'src/common/Form/Form';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({
		name: false,
		email: false,
		password: false,
	});

	const handleInputChange = (event, setter) => {
		setter(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newErrors = {
			name: name.length === 0,
			email: email.length === 0,
			password: password.length === 0,
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

		const newUser: User = {
			name,
			password,
			email,
		};

		const result = await usePostUser('register', newUser);

		if (result.successful) {
			alert(result.result);
			setName('');
			setEmail('');
			setPassword('');
		} else {
			alert(result.errors[0]);
		}
	};

	return (
		<Form header='Registration' onSubmit={handleSubmit}>
			<Input
				inputName='name'
				inputType='text'
				inputValue={name}
				error={errors.name}
				onChange={(event) => handleInputChange(event, setName)}
			/>
			<Input
				inputName='email'
				inputType='email'
				inputValue={email}
				error={errors.email}
				onChange={(event) => handleInputChange(event, setEmail)}
			/>
			<Input
				inputName='password'
				inputType='password'
				inputValue={password}
				error={errors.password}
				onChange={(event) => handleInputChange(event, setPassword)}
			/>
			<Button type='submit'>Register</Button>

			<p>
				If you have an account you may <Link to='/login'>Login</Link>
			</p>
		</Form>
	);
};

export default Registration;
