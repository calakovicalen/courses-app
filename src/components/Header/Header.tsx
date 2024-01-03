import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/store/rootReducer';
import { logout } from 'src/store/user/actions';

import Button from 'src/common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.css';
import { logoutUser } from 'src/services';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const { token, name, email, isAuth } = useSelector(
		(state: RootState) => state.auth
	);

	const handleLogout = async () => {
		dispatch(logout());
		try {
			const result = await logoutUser(token);

			if (result.success) {
				alert('Successfully logged out');
				navigate('/login');
			} else {
				alert(result.error);
			}
		} catch (error) {
			console.error('Error during logout:', error);
			alert('An error occurred during logout');
		}
	};

	return (
		<header className='header'>
			<Logo />
			{isAuth ? (
				location.pathname !== '/register' &&
				location.pathname !== '/login' && (
					<div className='logout__container'>
						<p>{name || email}</p>
						<Button onClick={handleLogout}>Logout</Button>
					</div>
				)
			) : (
				<Button onClick={() => navigate('/login')}>Login</Button>
			)}
		</header>
	);
};

export default Header;
