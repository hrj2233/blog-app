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
import { sendSms, smsOTP, smsVerify } from '../config/sms';
import {
	IDecodedToken,
	IUser,
	IGgPayload,
	IUserParams,
} from '../config/interface';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
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

			const user = await Users.findOne({ account: newUser.account });
			if (user)
				return res.status(400).json({ message: '계정이 이미 존재합니다.' });

			const new_user = new Users(newUser);

			await new_user.save();
			return res.json({ message: '계정이 활성화 되었습니다!' });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
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
			res.json({ access_token, user });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	googleLogin: async (req: Request, res: Response) => {
		try {
			const { id_token } = req.body;
			const verify = await client.verifyIdToken({
				idToken: id_token,
				audience: `${process.env.MAIL_CLIENT_ID}`,
			});

			const { email, email_verified, name, picture } = <IGgPayload>(
				verify.getPayload()
			);

			if (!email_verified)
				return res.status(500).json({ msg: '이메일 인증 실패' });

			const password = email + 'your google secrect password';
			const passwordHash = await bcrypt.hash(password, 12);
			const user = await Users.findOne({ account: email });
			if (user) {
				loginUser(user, password, res);
			} else {
				const user = {
					name,
					account: email,
					password: passwordHash,
					avatar: picture,
					type: 'login',
				};
				registerUser(user, res);
			}
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	loginSMS: async (req: Request, res: Response) => {
		try {
			const { phone } = req.body;
			const data = await smsOTP(phone, 'sms');
			res.json(data);
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	smsVerify: async (req: Request, res: Response) => {
		try {
			const { phone, code } = req.body;
			const data = await smsVerify(phone, code);
			if (!data?.valid)
				return res.status(400).json({ message: '잘못된 인증입니다.' });
			const password = phone + 'your phone secrect password';
			const passwordHash = await bcrypt.hash(password, 12);

			const user = await Users.findOne({ account: phone });

			if (user) {
				loginUser(user, password, res);
			} else {
				const user = {
					name: phone,
					account: phone,
					password: passwordHash,
					type: 'login',
				};
				registerUser(user, res);
			}
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

const registerUser = async (user: IUserParams, res: Response) => {
	const newUser = new Users(user);
	await newUser.save();

	const access_token = generateAccessToken({ id: newUser._id });
	const refresh_token = generateRefreshToken({ id: newUser._id });

	res.cookie('refreshtoken', refresh_token, {
		httpOnly: true,
		path: `/api/refresh_token`,
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
	});

	res.json({
		msg: '로그인 성공!',
		access_token,
		user: { ...newUser._doc, password: '' },
	});
};

export default authController;
