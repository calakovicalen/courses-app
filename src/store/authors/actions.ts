import {
	AddNewAuthorsAction,
	AuthorType,
	AuthorsActionTypes,
	DeleteAuthorAction,
	GetAuthorsAction,
} from './types';

export const addNewAuthorAction = (
	authorData: AuthorType
): AddNewAuthorsAction => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload: authorData,
});

export const deleteAuthorAction = (authorId: string): DeleteAuthorAction => ({
	type: AuthorsActionTypes.DELETE_AUTHOR,
	payload: authorId,
});

export const getAuthorsAction = (
	authorData: AuthorType[]
): GetAuthorsAction => ({
	type: AuthorsActionTypes.GET_AUTHORS,
	payload: authorData,
});
