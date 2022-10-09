import { IAuth } from '../types/authType';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAuth = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		getAuth(state, action) {
			state.message = action.payload.message;
			state.access_token = action.payload.access_token;
			state.user = action.payload.user;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
