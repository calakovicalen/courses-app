import React from 'react';

import { InputProps } from './Input.type';

import './Input.css';

function Input({
	inputName,
	inputType,
	inputValue,
	onChange,
	required,
	error,
}: InputProps) {
	return (
		<div className='input__container'>
			<label>{inputName}</label>
			<input
				type={inputType}
				value={inputValue}
				onChange={onChange}
				required={required}
				className={`input ${error ? 'input-error' : ''}`}
			/>
			{error && <span className='error-message'>{inputName} is required.</span>}
		</div>
	);
}

export default Input;
