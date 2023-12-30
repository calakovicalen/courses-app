import { AddNewAuthorsAction, AuthorType, AuthorsActionTypes } from './types';

export const addNewAuthorAction = (
	authorData: AuthorType
): AddNewAuthorsAction => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload: authorData,
});
