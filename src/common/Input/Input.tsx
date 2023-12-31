import React from 'react';
import { InputProps } from './Input.type';

import './Input.css';

const Input: React.FC<InputProps> = ({
	inputName,
	inputType,
	inputValue,
	onChange,
	required,
	error,
	className,
}) => (
	<div className={`input__container ${className}`}>
		<label htmlFor={`input-${inputName}`}>{inputName}</label>
		<input
			id={`input-${inputName}`}
			type={inputType}
			value={inputValue}
			onChange={onChange}
			required={required}
			className={`input ${error ? 'input-error' : ''}`}
		/>
		{error && <span className='error-message'>{inputName} is required.</span>}
	</div>
);

export default Input;
