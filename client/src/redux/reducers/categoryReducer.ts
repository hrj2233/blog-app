import { ICategory } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICategory[] = [];

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		getCategories(state, action) {
			return action.payload;
		},
		createCategory(state, action) {
			return [action.payload];
		},
		updateCategory(state, action) {
			return state.map((item) =>
				item._id === action.payload._id
					? { ...item, name: action.payload.name }
					: item
			);
		},
		deleteCategory(state, action) {
			return state.filter((item) => item._id !== action.payload);
		},
	},
});

export const categoryAction = categorySlice.actions;
export default categorySlice.reducer;
