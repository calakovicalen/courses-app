import React from 'react';
import { ButtonProps } from './Button.type';
import './Button.css';

function Button({ buttonText, onClick, type }: ButtonProps) {
	return (
		<button className='button' onClick={onClick} type={type}>
			{buttonText}
		</button>
	);
}

export default Button;
