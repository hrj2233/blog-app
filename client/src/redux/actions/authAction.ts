import { Dispatch } from 'redux';
import { IAuthType } from '../types/authType';
import { IAlertType } from '../types/alertType';

import { IUserLogin, IUserRegister } from '../../utils/types';
import { getAPI, postAPI } from '../../utils/fetchData';

import { authActions } from '../reducers/authReducer';
import { alertActions } from '../reducers/alertReducer';
import { validRegister } from '../../utils/valid';

export const login: any =
	(userLogin: IUserLogin) =>
	async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		try {
			dispatch(alertActions.getAlert({ loading: true }));

			const res = await postAPI('login', userLogin);

			dispatch(
				authActions.getAuth({
					message: res.data.message,
					access_token: res.data.access_token,
					user: res.data.user,
				})
			);

			dispatch(alertActions.getAlert({ success: res.data.message }));
			localStorage.setItem('logged', 'user');
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const register: any =
	(userRegister: IUserRegister) =>
	async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		const check = validRegister(userRegister);

		if (check.errLength > 0)
			return dispatch(alertActions.getAlert({ errors: check.errMessage }));

		try {
			dispatch(alertActions.getAlert({ loading: true }));

			const res = await postAPI('register', userRegister);

			dispatch(alertActions.getAlert({ success: res.data.message }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const refreshToken: any =
	() => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		const logged = localStorage.getItem('logged');
		if (logged !== 'user') return;

		try {
			dispatch(alertActions.getAlert({ loading: true }));

			const res = await getAPI('refresh_token');
			dispatch(authActions.getAuth(res.data));
			dispatch(alertActions.getAlert({}));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const logout: any =
	() => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		try {
			localStorage.removeItem('logged');
			await getAPI('logout');
			window.location.href = '/';
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const googleLogin: any =
	(id_token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		try {
			dispatch(alertActions.getAlert({ loading: 'true' }));
			const res = await postAPI('google_login', { id_token });
			dispatch(authActions.getAuth(res.data));
			dispatch(alertActions.getAlert({ success: res.data.message }));
			localStorage.setItem('logged', 'user');
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
