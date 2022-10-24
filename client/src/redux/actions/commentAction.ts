import { Dispatch } from 'redux';
import { checkTokenExp } from '../../utils/checkTokenExp';
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/fetchData';
import { IComment } from '../../utils/types';
import { alertActions } from '../reducers/alertReducer';
import { commentAction } from '../reducers/commentReducer';
import { IAlertType } from '../types/alertType';
import {
	ICreateCommentType,
	IDeleteType,
	IGetCommentsType,
	IReplyCommentType,
	IUpdateType,
} from '../types/commentType';

export const createComment: any =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			const res = await postAPI('comment', data, access_token);
			dispatch(commentAction.createComment({ ...res.data, user: data.user }));
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const getComments: any =
	(id: string, num: number) =>
	async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
		try {
			let limit = 4;
			const res = await getAPI(
				`comments/blog/${id}?page=${num}&limit=${limit}`
			);
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
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			const res = await postAPI('reply_comment', data, access_token);
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

export const updateComment: any =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | IUpdateType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			data.comment_root
				? dispatch(commentAction.updateReply(data))
				: dispatch(commentAction.updateComment(data));
			await patchAPI(
				`comment/${data._id}`,
				{ content: data.content },
				access_token
			);
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};

export const deleteComment: any =
	(data: IComment, token: string) =>
	async (dispatch: Dispatch<IAlertType | IDeleteType>) => {
		const result = await checkTokenExp(token, dispatch);
		const access_token = result ? result : token;
		try {
			data.comment_root
				? dispatch(commentAction.deleteReply(data))
				: dispatch(commentAction.deleteComment(data));

			await deleteAPI(`comment/${data._id}`, access_token);
		} catch (err: any) {
			dispatch(alertActions.getAlert({ errors: err.response.data.message }));
		}
	};
