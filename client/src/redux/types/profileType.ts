import { IUser } from '../../utils/types';

export const GET_OTHER_INFO = 'GET_OTHER_INFO';

export interface IGetOtherInfoType {
	type: typeof GET_OTHER_INFO;
	payload: IUser;
}
