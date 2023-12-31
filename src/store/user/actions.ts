import {
	LoginFailureAction,
	LoginRequestAction,
	LoginSuccessAction,
	UserActionTypes,
	UserType,
} from './types';

export const loginRequest = (): LoginRequestAction => ({
	type: UserActionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (
	token: string,
	user: UserType
): LoginSuccessAction => ({
	type: UserActionTypes.LOGIN_SUCCESS,
	payload: { token, user },
});

export const loginFailure = (error: string): LoginFailureAction => ({
	type: UserActionTypes.LOGIN_FAILURE,
	payload: { error },
});

export const logout = () => ({
	type: UserActionTypes.LOGOUT,
});
