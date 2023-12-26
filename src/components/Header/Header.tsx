import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from 'src/common/Button/Button';

import './Header.css';

function Header({ token, onRemoveToken }) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header className='header'>
			<Logo />
			{token ? (
				<>
					{location.pathname !== 'register' &&
						location.pathname !== 'login' && (
							<div className='logout__container'>
								<p>{localStorage.getItem('userToken')}</p>
								<Button
									buttonText='logout'
									onClick={() => {
										onRemoveToken();
									}}
								/>
							</div>
						)}
				</>
			) : (
				<Button
					buttonText='login'
					onClick={() => {
						navigate('/login');
					}}
				/>
			)}
		</header>
	);
}

export default Header;
