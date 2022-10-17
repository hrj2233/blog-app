import { createSlice } from '@reduxjs/toolkit';
import { IBlogsCategory } from '../types/blogType';

const initialState: IBlogsCategory[] = [];

const blogsCategorySlice = createSlice({
	name: 'blogsCategory',
	initialState,
	reducers: {
		getBlogsCategoryId(state, action) {
			return [action.payload];
		},
	},
});

export const blogsCategoryAction = blogsCategorySlice.actions;
export default blogsCategorySlice.reducer;
