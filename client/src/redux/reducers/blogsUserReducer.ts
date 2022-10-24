import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types';
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
				return state.map((item) =>
					item.id === action.payload.id ? action.payload : item
				);
			}
		},
		createBlogsUserId(state, action) {
			return state.map((item) =>
				item.id === (action.payload.user as IUser)._id
					? {
							...item,
							blogs: [action.payload, ...item.blogs],
					  }
					: item
			);
		},
		deleteBlogsUserId(state, action) {
			return state.map((item) =>
				item.id === (action.payload.user as IUser)._id
					? {
							...item,
							blogs: item.blogs.filter(
								(blog) => blog._id !== action.payload._id
							),
					  }
					: item
			);
		},
	},
});

export const blogsUserAction = blogsUserSlice.actions;
export default blogsUserSlice.reducer;
