import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alertReducer';
import authReducer from './reducers/authReducer';
import blogsCategoryReducer from './reducers/blogsCategoryReducer';
import blogsUserReducer from './reducers/blogsUserReducer';
import categoryReducer from './reducers/categoryReducer';
import commentReducer from './reducers/commentReducer';
import homeBlogsReducer from './reducers/homeBlogsReducer';
import otherInfoReducer from './reducers/otherInfoReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		alert: alertReducer,
		categories: categoryReducer,
		homeBlogs: homeBlogsReducer,
		blogsCategory: blogsCategoryReducer,
		otherInfo: otherInfoReducer,
		blogsUser: blogsUserReducer,
		comments: commentReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
