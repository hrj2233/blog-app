import { IAlert } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAlert = {};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		getAlert(state, action) {
			state.loading = action.payload.loading;
			state.success = action.payload.success;
			state.errors = action.payload.errors;
		},
	},
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
