import { Request, Response } from 'express';
import Users from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateActiveToken } from '../config/token';
import sendEmail from '../config/mail';
import { validateEmail, validatePhone } from '../middleware/vaild';
import { sendSms } from '../config/sms';
import { IDecodedToken } from '../config/interface';

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
				return res.json({ message: '성공! 휴대번호를 확인해주세요.' });
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
};

export default authController;
