import { Dispatch } from 'redux';
import { IBlog } from '../../utils/types';
import { imageUpload } from '../../utils/imageUpload';
import { IAlertType } from '../types/alertType';
import { alertActions } from '../reducers/alertReducer';
import { getAPI, postAPI } from '../../utils/fetchData';
import { IGetBlogsCategoryType, IGetHomeBlogsType } from '../types/blogType';
import { homeBlogsAction } from '../reducers/homeBlogsReducer';
import { blogsCategoryAction } from '../reducers/blogsCategoryReducer';

export const createBlog: any =
	(blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
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
			const res = await postAPI('blog', newBlog, token);

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
			console.log(search);
			const res = await getAPI(`blogs/${id}${value}&limit=${limit}`);
			console.log(res.data);
			dispatch(
				blogsCategoryAction.getBlogsCategoryId({ ...res.data, id, search })
			);

			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
