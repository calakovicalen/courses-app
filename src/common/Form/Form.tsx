import React from 'react';
import { FormProps } from './Form.type';

import './Form.css';

const Form: React.FC<FormProps> = ({ header, onSubmit, children }) => (
	<div className='form-container'>
		<h2>{header}</h2>
		<form className='form' onSubmit={onSubmit}>
			{children}
		</form>
	</div>
);

export default Form;
