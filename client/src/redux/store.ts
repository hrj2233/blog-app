import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alertReducer';
import authReducer from './reducers/authReducer';
import blogsCategoryReducer from './reducers/blogsCategoryReducer';
import categoryReducer from './reducers/categoryReducer';
import homeBlogsReducer from './reducers/homeBlogsReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		alert: alertReducer,
		categories: categoryReducer,
		homeBlogs: homeBlogsReducer,
		blogsCategory: blogsCategoryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
