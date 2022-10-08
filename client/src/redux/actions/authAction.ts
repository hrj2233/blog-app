import { Dispatch } from 'redux';
import { IAuthType } from '../types/authType';
import { authActions } from '../reducers/authReducer';
import { IUserLogin } from '../../utils/types';
import { postAPI } from '../../utils/fetchData';
import { IAlertType } from '../types/alertType';
import { alertActions } from '../reducers/alertReducer';

export const login: any =
	(userLogin: IUserLogin) =>
	async (dispatch: Dispatch<IAuthType | IAlertType>) => {
		try {
			dispatch(alertActions.getAlert({ loading: true }));

			const res = await postAPI('login', userLogin);

			dispatch(
				authActions.getAuth({
					token: res.data.access_token,
					user: res.data.user,
				})
			);

			dispatch(alertActions.getAlert({ success: res.data.message }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
