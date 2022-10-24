import { Dispatch } from 'redux';
import { IBlog } from '../../utils/types';
import { imageUpload } from '../../utils/imageUpload';
import { IAlertType } from '../types/alertType';
import { alertActions } from '../reducers/alertReducer';
import { deleteAPI, getAPI, postAPI, putAPI } from '../../utils/fetchData';
import {
	ICreateBlogsUserType,
	IDeleteBlogsUserType,
	IGetBlogsCategoryType,
	IGetBlogsUserType,
	IGetHomeBlogsType,
} from '../types/blogType';
import { homeBlogsAction } from '../reducers/homeBlogsReducer';
import { blogsCategoryAction } from '../reducers/blogsCategoryReducer';
import { blogsUserAction } from '../reducers/blogsUserReducer';
import { checkTokenExp } from '../../utils/checkTokenExp';

export const createBlog: any =
	(blog: IBlog, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;

		let url;
		try {
			dispatch(alertActions.getAlert({ loading: true }));

			if (typeof blog.thumbnail !== 'string') {
				const photo = await imageUpload(blog.thumbnail);
				url = photo.url;
			} else {
				url = blog.thumbnail;
			}

			const newBlog = { ...blog, thumbnail: url };
			const res = await postAPI('blog', newBlog, access_token);

			dispatch(blogsUserAction.createBlogsUserId(res.data));

			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
export const getHomeBlogs: any =
	() => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
		try {
			dispatch(alertActions.getAlert({ loading: true }));

			const res = await getAPI('home/blogs');

			dispatch(homeBlogsAction.getHomeBlogs(res.data));
			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const getBlogsByCategoryId: any =
	(id: string, search: string) =>
	async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
		try {
			let limit = 8;
			let value = search ? search : `?page=${1}`;
			dispatch(alertActions.getAlert({ loading: true }));
			const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`);
			dispatch(
				blogsCategoryAction.getBlogsCategoryId({ ...res.data, id, search })
			);

			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const getBlogsByUserId: any =
	(id: string, search: string) =>
	async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
		try {
			let limit = 3;
			let value = search ? search : `?page=${1}`;

			dispatch(alertActions.getAlert({ loading: true }));

			const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`);

			dispatch(blogsUserAction.getBlogsUserId({ ...res.data, id, search }));

			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const updateBlog: any =
	(blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		let url;
		try {
			dispatch(alertActions.getAlert({ loading: true }));

			if (typeof blog.thumbnail !== 'string') {
				const photo = await imageUpload(blog.thumbnail);
				url = photo.url;
			} else {
				url = blog.thumbnail;
			}

			const newBlog = { ...blog, thumbnail: url };

			const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token);

			dispatch(alertActions.getAlert({ success: res.data.message }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const deleteBlog: any =
	(blog: IBlog, token: string) =>
	async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			dispatch(blogsUserAction.deleteBlogsUserId(blog));
			await deleteAPI(`blog/${blog._id}`, access_token);
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
