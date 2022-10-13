import { IAlert } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAlert = {};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		getAlert(state, action) {
			return action.payload;
		},
	},
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
