import { Dispatch } from 'redux';
import { checkTokenExp } from '../../utils/checkTokenExp';
import { postAPI, getAPI, patchAPI, deleteAPI } from '../../utils/fetchData';
import { ICategory } from '../../utils/types';
import { alertActions } from '../reducers/alertReducer';
import { categoryAction } from '../reducers/categoryReducer';
import { IAlertType } from '../types/alertType';
import { ICategoryType } from '../types/categoryType';

export const createCategory: any =
	(name: string, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			dispatch(alertActions.getAlert({ loading: true }));

			const res = await postAPI('category', { name }, access_token);

			dispatch(categoryAction.createCategory(res.data.newCategory));

			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const getCategories: any =
	() => async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		try {
			dispatch(alertActions.getAlert({ loading: true }));

			const res = await getAPI('category');

			dispatch(categoryAction.getCategories(res.data.categories));

			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const updateCategory: any =
	(data: ICategory, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			dispatch(categoryAction.updateCategory(data));
			await patchAPI(`category/${data._id}`, { name: data.name }, access_token);
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const deleteCategory: any =
	(id: string, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICategoryType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			dispatch(categoryAction.deleteCategory(id));
			await deleteAPI(`category/${id}`, access_token);
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
