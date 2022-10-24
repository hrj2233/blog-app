import { IBlog, IUserRegister } from './types';

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

	const message = checkPassword(password, cf_password);
	if (message) errors.push(message);

	return {
		errMessage: errors,
		errLength: errors.length,
	};
};

export const checkPassword = (password: string, cf_password: string) => {
	if (password.length < 6) {
		return '비밀번호는 적어도 6글자 이상이어야 합니다.';
	} else if (password !== cf_password) {
		return '비밀번호가 일치하지 않습니다.';
	}
};

export const validatePhone = (phone: string) => {
	const re = /^[+]/g;
	return re.test(phone);
};

export const validateEmail = (email: string) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

// Valid Blog
export const validCreateBlog = ({
	title,
	content,
	description,
	thumbnail,
	category,
}: IBlog) => {
	const err: string[] = [];

	if (title.trim().length < 10) {
		err.push('제목은 10자 이상이어야 합니다.');
	} else if (title.trim().length > 50) {
		err.push('제목은 최대 50자입니다.');
	}

	if (content.trim().length < 2000) {
		err.push('콘텐츠는 2000자 이상이어야 합니다.');
	}

	if (description.trim().length < 50) {
		err.push('설명은 50자 이상이어야 합니다.');
	} else if (description.trim().length > 200) {
		err.push('설명은 최대 200자입니다.');
	}

	if (!thumbnail) {
		err.push('썸네일은 비워둘 수 없습니다.');
	}

	if (!category) {
		err.push('카테고리는 비워둘 수 없습니다.');
	}

	return {
		errMsg: err,
		errLength: err.length,
	};
};

// Shallow equality
export const shallowEqual = (object1: any, object2: any) => {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}

	return true;
};
