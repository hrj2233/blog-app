import { IUserRegister } from './types';

export const validRegister = (userRegister: IUserRegister) => {
	const { name, account, password, cf_password } = userRegister;
	const errors: string[] = [];

	if (!name) {
		errors.push('이름을 입력하세요.');
	} else if (name.length > 20) {
		errors.push('이름의 최대 길이는 20글자 입니다.');
	}

	if (!account) {
		errors.push('이메일 또는 전화번호를 입력하세요.');
	} else if (!validatePhone(account) && !validateEmail(account)) {
		errors.push('이메일 또는 전화번호 형식이 정확하지 않습니다.');
	}

	if (password.length < 6) {
		errors.push('비밀번호는 적어도 6글자 이상이어야 합니다.');
	} else if (password !== cf_password) {
		errors.push('비밀번호가 일치하지 않습니다.');
	}

	return {
		errMessage: errors,
		errLength: errors.length,
	};
};

export const validatePhone = (phone: string) => {
	const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/im;
	return re.test(phone);
};

export const validateEmail = (email: string) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};
