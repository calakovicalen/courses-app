import React from 'react';
import { ButtonProps } from './Button.type';

import './Button.css';

const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => (
	<button className='button' onClick={onClick} type={type}>
		{children}
	</button>
);

export default Button;
