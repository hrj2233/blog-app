import { Dispatch } from 'redux';
import { alertActions } from '../reducers/alertReducer';
import { IAlertType } from '../types/alertType';
import { IAuth, IAuthType } from '../types/authType';
import { checkImage, imageUpload } from '../../utils/imageUpload';
import { patchAPI } from '../../utils/fetchData';
import { authActions } from '../reducers/authReducer';
import { checkPassword } from '../../utils/valid';

export const updateUser: any =
	(avatar: File, name: string, auth: IAuth) =>
	async (dispatch: Dispatch<IAlertType | IAuthType>) => {
		if (!auth.access_token || !auth.user) return;

		let url = '';
		try {
			dispatch(alertActions.getAlert({ loading: true }));
			if (avatar) {
				const check = checkImage(avatar);
				if (check) return dispatch(alertActions.getAlert({ errors: check }));
				const photo = await imageUpload(avatar);
				url = photo.url;
			}
			dispatch(
				authActions.getAuth({
					access_token: auth.access_token,
					user: {
						...auth.user,
						avatar: url ? url : auth.user.avatar,
						name: name ? name : auth.user.name,
					},
				})
			);
			const res = await patchAPI(
				'user',
				{
					avatar: url ? url : auth.user.avatar,
					name: name ? name : auth.user.name,
				},
				auth.access_token
			);
			dispatch(alertActions.getAlert({ success: res.data.message }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const resetPassword: any =
	(password: string, cf_password: string, token: string) =>
	async (dispatch: Dispatch<IAlertType | IAuthType>) => {
		const message = checkPassword(password, cf_password);
		if (message) return dispatch(alertActions.getAlert({ errors: message }));
		try {
			dispatch(alertActions.getAlert({ loading: true }));
			const res = await patchAPI('reset_password', { password }, token);
			dispatch(alertActions.getAlert({ success: res.data.message }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
