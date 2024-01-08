import { ThunkAction } from 'redux-thunk';
import {
	addNewAuthorAction,
	deleteAuthorAction,
	getAuthorsAction,
} from './actions';
import { fetchAuthors, addAuthor, deleteAuthor } from '../../services';
import { AuthorsAction } from './types';
import { RootState } from '../rootReducer';

type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	AuthorsAction
>;

export const fetchAuthorsThunk = (): AppThunk => async (dispatch) => {
	try {
		const authorsData = await fetchAuthors();
		dispatch(getAuthorsAction(authorsData.result));
	} catch (error) {
		console.error('Error fetching authors:', error);
	}
};

export const addAuthorThunk =
	(authorData, token: string): AppThunk =>
	async (dispatch) => {
		try {
			const addedAuthor = await addAuthor(authorData, token);
			dispatch(addNewAuthorAction(addedAuthor));
			return addedAuthor.result;
		} catch (error) {
			console.error('Error adding author:', error);
		}
	};

export const deleteAuthorThunk =
	(authorId: string, token: string): AppThunk =>
	async (dispatch) => {
		try {
			const deletedAuthor = await deleteAuthor(authorId, token);
			dispatch(deleteAuthorAction(authorId));
			return deletedAuthor;
		} catch (error) {
			console.error('Error deleting author:', error);
		}
	};
