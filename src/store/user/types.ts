export const enum UserActionTypes {
	LOGIN_REQUEST = 'LOGIN_REQUEST',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGIN_FAILURE = 'LOGIN_FAILURE',
	LOGOUT = 'LOGOUT',
}
export interface UserType {
	result: { name: string; email: string; role: string };
}

export interface AuthState {
	isAuth: boolean;
	token: string | null;
	name: string;
	email: string;
	loading: boolean;
	error: string | null;
	role: string;
}

export type UsersAction =
	| LoginRequestAction
	| LoginSuccessAction
	| LoginFailureAction
	| LogoutAction;

export type LoginRequestAction = {
	type: UserActionTypes.LOGIN_REQUEST;
};

export type LoginSuccessAction = {
	type: UserActionTypes.LOGIN_SUCCESS;
	payload: {
		token: string;
		user: UserType;
	};
};

export type LoginFailureAction = {
	type: UserActionTypes.LOGIN_FAILURE;
	payload: {
		error: string;
	};
};

export type LogoutAction = {
	type: UserActionTypes.LOGOUT;
};
