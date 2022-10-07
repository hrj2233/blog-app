import { IAuth } from '../types/authType';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAuth = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuth(state, action) {
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
