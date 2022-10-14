import { Dispatch } from 'redux';
import { IBlog } from '../../utils/types';
import { imageUpload } from '../../utils/imageUpload';
import { IAlertType } from '../types/alertType';
import { alertActions } from '../reducers/alertReducer';
import { postAPI } from '../../utils/fetchData';

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
