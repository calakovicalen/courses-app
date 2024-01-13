import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'src/store/rootReducer';

const PrivateRoute = ({ children }) => {
	const { role } = useSelector((state: RootState) => state.auth);
	return role === 'admin' ? <>{children}</> : <Navigate to='/courses' />;
};

export default PrivateRoute;
