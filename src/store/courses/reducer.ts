import { CourseType, CoursesAction, CoursesActionTypes } from './types';

const initCoursesState = [] as CourseType[];

export const coursesReducer = (
	state = initCoursesState,
	action: CoursesAction
) => {
	switch (action.type) {
		case CoursesActionTypes.SAVE_COURSES:
			return action.payload;
		case CoursesActionTypes.ADD_COURSE:
			return [...state, action.payload];
		default:
			return state;
	}
};
