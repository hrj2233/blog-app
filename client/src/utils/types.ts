import { ChangeEvent } from 'react';

export type InputChange = ChangeEvent<HTMLInputElement>;
export type FormSubmit = ChangeEvent<HTMLFormElement>;

export interface IUserLogin {
	account: string;
	password: string;
}

export interface IUserRegister extends IUserLogin {
	name: string;
	cf_password: string;
}

export interface IUser extends IUserLogin {
	avatar: string;
	createdAt: string;
	name: string;
	role: string;
	type: string;
	updatedAt: string;
	_id: string;
}

export interface IAlert {
	loading?: boolean;
	success?: string | string[];
	errors?: string | string[];
}

export interface IUserProfile extends IUserRegister {
	avatar: string | File;
}
