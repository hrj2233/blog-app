import { Request, Response, NextFunction } from 'express';

export const validRegister = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, account, password } = req.body;

	if (!name) {
		return res.status(400).json({ message: '이름을 입력하세요.' });
	} else if (name.length > 20) {
		return res
			.status(400)
			.json({ message: '이름의 최대 길이는 20글자 입니다.' });
	}

	if (!account) {
		return res
			.status(400)
			.json({ message: '이메일 또는 전화번호를 입력하세요.' });
	} else if (!validatePhone(account) && !validateEmail(account)) {
		return res
			.status(400)
			.json({ message: '이메일 또는 전화번호 형식이 정확하지 않습니다.' });
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json({ message: '패스워드는 적어도 6글자 이상이어야 합니다.' });
	}
	next();
};

const validatePhone = (phone: string) => {
	const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/im;
	return re.test(phone);
};

const validateEmail = (email: string) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};
