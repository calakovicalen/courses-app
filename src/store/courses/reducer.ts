import { CourseType, CoursesAction, CoursesActionTypes } from './types';

const initCoursesState = [] as CourseType[];

export const coursesReducer = (
	state = initCoursesState,
	action: CoursesAction
) => {
	switch (action.type) {
		case CoursesActionTypes.ADD_COURSE:
			return [...state, action.payload];

		case CoursesActionTypes.EDIT_COURSE:
			return state.map((course) =>
				course.id === action.payload.id ? action.payload : course
			);

		case CoursesActionTypes.DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);
		default:
			return state;
	}
};
