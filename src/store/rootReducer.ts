import { combineReducers } from '@reduxjs/toolkit';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import { authReducer } from './user/reducer';

const rootReducer = combineReducers({
	courses: coursesReducer,
	authors: authorsReducer,
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
