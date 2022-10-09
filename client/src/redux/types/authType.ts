import { IUser } from '../../utils/types';

export interface IAuth {
	message?: string;
	access_token?: string;
	user?: IUser;
}

export interface IAuthType {
	type: string;
	payload: IAuth;
}
