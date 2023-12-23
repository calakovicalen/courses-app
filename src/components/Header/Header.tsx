import React from 'react';

import Logo from './components/Logo/Logo';
import Button from 'src/common/Button/Button';

import './Header.css';

function Header() {
	return (
		<header className='header'>
			<Logo />
			<Button
				buttonText='login'
				onClick={() => {
					console.log('button');
				}}
			/>
		</header>
	);
}

export default Header;
