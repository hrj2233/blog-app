import { Dispatch } from 'react';
import { alertActions } from '../reducers/alertReducer';
import { IAlertType } from '../types/alertType';
import { IAuth } from '../types/authType';
import { checkImage, imageUpload } from '../../utils/imageUpload';

export const updateUser: any =
	(avatar: File, name: string, auth: IAuth) =>
	async (dispatch: Dispatch<IAlertType>) => {
		if (!auth.access_token || !auth.user) return;

		let url = '';
		try {
			dispatch(alertActions.getAlert({ loading: true }));
			if (avatar) {
				const check = checkImage(avatar);
				if (check) return dispatch(alertActions.getAlert({ errors: check }));
				const photo = await imageUpload(avatar);
			}
			dispatch(alertActions.getAlert({ loading: false }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
