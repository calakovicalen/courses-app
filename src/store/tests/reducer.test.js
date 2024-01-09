import { coursesReducer } from '../courses/reducer';
import { addCourseAction } from '../courses/actions';

describe('coursesReducer', () => {
	it('should return the initial state', () => {
		const initialState = [];
		const action = { type: 'UNKNOWN_ACTION' };

		const newState = coursesReducer(undefined, action);

		expect(newState).toEqual(initialState);
	});

	it('should handle ADD_COURSE and return new state', () => {
		const initialState = [];
		const newCourse = { id: '1', title: 'New Course' };
		const action = addCourseAction(newCourse);

		const newState = coursesReducer(initialState, action);

		expect(newState).toEqual([newCourse]);
	});
});
