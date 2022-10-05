import { Request, Response } from 'express';
import Users from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
	generateAccessToken,
	generateActiveToken,
	generateRefreshToken,
} from '../config/token';
import sendEmail from '../config/mail';
import { validateEmail, validatePhone } from '../middleware/vaild';
import { sendSms } from '../config/sms';
import { IDecodedToken, IUser } from '../config/interface';

const CLIENT_URL = `${process.env.BASE_URL}`;

const authController = {
	register: async (req: Request, res: Response) => {
		try {
			const { name, account, password } = req.body;

			const user = await Users.findOne({ account });
			if (user)
				return res
					.status(400)
					.json({ message: '이메일 또는 전화번호가 이미 존재합니다.' });

			const passwordHash = await bcrypt.hash(password, 12);

			const newUser = { name, account, password: passwordHash };

			const active_token = generateActiveToken({ newUser });
			const url = `${CLIENT_URL}/active/${active_token}`;

			if (validateEmail(account)) {
				sendEmail(account, url, '이메일 인증하기');
				return res.json({ message: '성공! 이메일을 확인해주세요.' });
			} else if (validatePhone(account)) {
				sendSms(account, url, '이메일 인증하기');
				return res.json({ message: '성공! 휴대전화를 확인해주세요.' });
			}
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	activeAccount: async (req: Request, res: Response) => {
		try {
			const { active_token } = req.body;

			const decoded = <IDecodedToken>(
				jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
			);

			const { newUser } = decoded;

			if (!newUser)
				return res.status(400).json({ message: '잘못된 인증입니다.' });

			const user = new Users(newUser);

			await user.save();

			res.json({ message: '계정이 활성화되었습니다!' });
		} catch (err: any) {
			let errMsg;
			if (err.code === 11000) {
				errMsg = Object.keys(err.keyValue)[0] + '가 이미 존재합니다.';
			} else {
				let name = Object.keys(err.errors)[0];
				errMsg = err.errors[`${name}`].properties.message;
			}
			return res.status(500).json({ message: errMsg });
		}
	},
	login: async (req: Request, res: Response) => {
		try {
			const { account, password } = req.body;
			const user = await Users.findOne({ account });
			if (!user)
				return res
					.status(400)
					.json({ message: '이 계정은 존재하지 않습니다.' });
			// if user exists
			loginUser(user, password, res);
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	logout: async (req: Request, res: Response) => {
		try {
			res.clearCookie('refreshtoken', { path: `/api/refresh_token` });
			return res.json({ message: '로그아웃!' });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	refreshToken: async (req: Request, res: Response) => {
		try {
			const rf_token = req.cookies.refreshtoken;
			if (!rf_token)
				return res.status(400).json({ message: '지금 로그인 하세요!' });
			const decoded = <IDecodedToken>(
				jwt.verify(rf_token, `${process.env.REFRESH_TOKEN}`)
			);
			if (!decoded)
				return res.status(400).json({ message: '지금 로그인 하세요!' });
			const user = await Users.findById(decoded.id).select('-password');
			if (!user)
				return res
					.status(400)
					.json({ message: '이 계정은 존재하지 않습니다.' });
			const access_token = generateAccessToken({ id: user._id });
			res.json({ access_token });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
};

const loginUser = async (user: IUser, password: string, res: Response) => {
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch)
		return res.status(500).json({ message: '패스워드가 맞지 않습니다.' });
	const access_token = generateAccessToken({ id: user._id });
	const refresh_token = generateRefreshToken({ id: user._id });

	res.cookie('refreshtoken', refresh_token, {
		httpOnly: true,
		path: `/api/refresh_token`,
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
	});

	res.json({
		message: '로그인 성공!',
		access_token,
		user: { ...user._doc, password: '' },
	});
};

export default authController;
