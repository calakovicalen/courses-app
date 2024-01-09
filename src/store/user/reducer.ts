import { UserActionTypes, AuthState, UsersAction } from './types';

const initialState: AuthState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('userToken') || '',
	loading: false,
	error: null,
};

export const authReducer = (state = initialState, action: UsersAction) => {
	switch (action.type) {
		case UserActionTypes.LOGIN_REQUEST:
			return { ...state, loading: true, error: null };

		case UserActionTypes.LOGIN_SUCCESS:
			localStorage.setItem('userToken', action.payload.token);
			return {
				...state,
				isAuth: true,
				loading: false,
				token: action.payload.token,
				user: action.payload.user.name,
				email: action.payload.user.email,
				error: null,
			};

		case UserActionTypes.LOGIN_FAILURE:
			return { ...state, loading: false, error: action.payload.error };

		case UserActionTypes.LOGOUT:
			return { ...state, token: null, user: null };
		default:
			return state;
	}
};
