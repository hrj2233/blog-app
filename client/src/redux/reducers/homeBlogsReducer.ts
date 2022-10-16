import { createSlice } from '@reduxjs/toolkit';
import { IHomeBlogs } from '../types/blogType';

const initialState: IHomeBlogs[] = [];

const homeBlogsSlice = createSlice({
	name: 'homeBlog',
	initialState,
	reducers: {
		getHomeBlogs(state, action) {
			return action.payload;
		},
	},
});

export const homeBlogsAction = homeBlogsSlice.actions;
export default homeBlogsSlice.reducer;
