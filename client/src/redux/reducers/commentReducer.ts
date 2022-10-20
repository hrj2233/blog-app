import { createSlice } from '@reduxjs/toolkit';
import { ICommentState } from '../types/commentType';

const initialState: ICommentState = {
	data: [],
	total: 1,
};

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		createComment(state, action) {
			return {
				...state,
				data: [action.payload, ...state.data],
			};
		},
	},
});

export const commentAction = commentSlice.actions;
export default commentSlice.reducer;
