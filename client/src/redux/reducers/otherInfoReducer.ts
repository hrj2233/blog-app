import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../utils/types';

const initialState: IUser[] = [];

const otherInfoSlice = createSlice({
	name: 'otherInfo',
	initialState,
	reducers: {
		getOtherInfo(state, action) {
			return [action.payload];
		},
	},
});

export const otherInfoAction = otherInfoSlice.actions;
export default otherInfoSlice.reducer;
