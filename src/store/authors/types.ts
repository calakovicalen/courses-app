export const enum AuthorsActionTypes {
	ADD_AUTHOR = 'ADD_AUTHOR',
	DELETE_AUTHOR = 'DELETE_AUTHOR',
}

export interface AuthorType {
	id: string;
	name: string;
}

interface AddAuthor {
	type: AuthorsActionTypes.ADD_AUTHOR;
	payload: AuthorType;
}

interface DeleteAuthor {
	type: AuthorsActionTypes.DELETE_AUTHOR;
	payload: AuthorType;
}

export type AuthorsAction = AddAuthor | DeleteAuthor;

export type AddNewAuthorsAction = {
	type: AuthorsActionTypes.ADD_AUTHOR;
	payload: AuthorType;
};