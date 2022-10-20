import { Dispatch } from 'redux';
import { postAPI } from '../../utils/fetchData';
import { IComment } from '../../utils/types';
import { alertActions } from '../reducers/alertReducer';
import { commentAction } from '../reducers/commentReducer';
import { IAlertType } from '../types/alertType';
import { ICreateCommentType } from '../types/commentType';

export const createComment: any =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
		try {
			const res = await postAPI('comment', data, token);
			dispatch(commentAction.createComment({ ...res.data, user: data.user }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
