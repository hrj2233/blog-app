import { IComment } from '../../utils/types';

export const CREATE_COMMENT = 'CREATE_COMMENT';

export interface ICommentState {
	data: IComment[];
	total: number;
}

export interface ICreateCommentType {
	type: typeof CREATE_COMMENT;
	payload: IComment;
}

export type ICommentType = ICreateCommentType;
