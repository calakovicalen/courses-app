import {
	AddNewAuthorsAction,
	AuthorType,
	AuthorsActionTypes,
	GetAuthorsAction,
} from './types';

export const addNewAuthorAction = (
	authorData: AuthorType
): AddNewAuthorsAction => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload: authorData,
});

export const getAuthorsAction = (
	authorData: AuthorType[]
): GetAuthorsAction => ({
	type: AuthorsActionTypes.GET_AUTHORS,
	payload: authorData,
});
