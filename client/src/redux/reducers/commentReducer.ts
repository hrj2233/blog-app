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
		getComments(state, action) {
			return action.payload;
		},
		replyComment(state, action) {
			return {
				...state,
				data: state.data.map((item) =>
					item._id === action.payload.comment_root
						? {
								...item,
								replyCM: [...(item.replyCM as []), action.payload],
						  }
						: item
				),
			};
		},
	},
});

export const commentAction = commentSlice.actions;
export default commentSlice.reducer;
