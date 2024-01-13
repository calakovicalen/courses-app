import { UserActionTypes, AuthState, UsersAction } from './types';

const initialState: AuthState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('userToken') || '',
	loading: false,
	error: null,
	role: '',
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
				name: action.payload.user.result?.name,
				email: action.payload.user.result?.email,
				error: null,
				role: action.payload.user.result?.role,
			};

		case UserActionTypes.LOGIN_FAILURE:
			return { ...state, loading: false, error: action.payload.error };

		case UserActionTypes.LOGOUT:
			return { ...state, isAuth: false, token: null };
		default:
			return state;
	}
};
