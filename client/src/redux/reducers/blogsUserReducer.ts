import { createSlice } from '@reduxjs/toolkit';
import { IBlogsUser } from '../types/blogType';

const initialState: IBlogsUser[] = [];

const blogsUserSlice = createSlice({
	name: 'blogsUser',
	initialState,
	reducers: {
		getBlogsUserId(state, action) {
			if (state.every((item) => item.id !== action.payload.id)) {
				return [action.payload];
			} else {
				return state.map((blog) =>
					blog.id === action.payload.id ? action.payload : blog
				);
			}
		},
	},
});

export const blogsUserAction = blogsUserSlice.actions;
export default blogsUserSlice.reducer;
