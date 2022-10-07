import { IUser } from '../../utils/types';

export interface IAuth {
	token?: string;
	user?: IUser;
}

export interface IAuthType {
	type: string;
	payload: IAuth;
}
