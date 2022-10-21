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
								replyCM: [action.payload, ...(item.replyCM as [])],
						  }
						: item
				),
			};
		},
		updateComment(state, action) {
			return {
				...state,
				data: state.data.map((item) =>
					item._id === action.payload._id ? action.payload : item
				),
			};
		},
		updateReply(state, action) {
			return {
				...state,
				data: state.data.map((item) =>
					item._id === action.payload.comment_root
						? {
								...item,
								replyCM: item.replyCM?.map((rp) =>
									rp._id === action.payload._id ? action.payload : rp
								),
						  }
						: item
				),
			};
		},
	},
});

export const commentAction = commentSlice.actions;
export default commentSlice.reducer;
