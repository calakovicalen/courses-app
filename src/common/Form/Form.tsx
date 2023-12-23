import React from 'react';

import './Form.css';

function Form({ header, onSubmit, children }) {
	return (
		<div className='form-container'>
			<h2>{header}</h2>
			<form className='form' onSubmit={onSubmit}>
				{children}
			</form>
		</div>
	);
}

export default Form;
