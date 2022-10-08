import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alertReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		alert: alertReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
