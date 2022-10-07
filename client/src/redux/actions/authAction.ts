import { Dispatch } from 'redux';
import { IAuthType } from '../types/authType';
import { authActions } from '../reducers/authReducer';
import { IUserLogin } from '../../utils/types';
import { postAPI } from '../../utils/fetchData';

export const login: any =
	(userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType>) => {
		try {
			const res = await postAPI('login', userLogin);
			dispatch(authActions.getAuth(res));
		} catch (err: any) {
			console.log(err.resposne.data.message);
		}
	};
