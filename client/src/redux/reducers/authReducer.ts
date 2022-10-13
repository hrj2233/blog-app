import { IAuth } from '../types/authType';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAuth = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuth(state, action) {
			return action.payload;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
