import { Dispatch } from 'redux';
import { getAPI, postAPI } from '../../utils/fetchData';
import { IComment } from '../../utils/types';
import { alertActions } from '../reducers/alertReducer';
import { commentAction } from '../reducers/commentReducer';
import { IAlertType } from '../types/alertType';
import {
	ICreateCommentType,
	IGetCommentsType,
	IReplyCommentType,
} from '../types/commentType';

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

export const getComments: any =
	(id: string) => async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
		try {
			let limit = 8;
			const res = await getAPI(`comments/blog/${id}?limit=${limit}`);
			dispatch(
				commentAction.getComments({
					data: res.data.comments,
					total: res.data.total,
				})
			);
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const replyComment: any =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
		try {
			const res = await postAPI('reply_comment', data, token);
			dispatch(
				commentAction.replyComment({
					...res.data,
					user: data.user,
					reply_user: data.reply_user,
				})
			);
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};