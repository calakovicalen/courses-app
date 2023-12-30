import { AuthorType, AuthorsAction, AuthorsActionTypes } from './types';

const initAuthorsState = [] as AuthorType[];

export const authorsReducer = (
	state = initAuthorsState,
	action: AuthorsAction
) => {
	switch (action.type) {
		case AuthorsActionTypes.ADD_AUTHOR:
			return [...state, action.payload];
		default:
			return state;
	}
};
