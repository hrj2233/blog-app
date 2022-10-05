import { Request, Response } from 'express';
import Users from '../models/User';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../config/token';
import { validateEmail } from '../middleware/vaild';
import sendEmail from '../config/mail';

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

			const access_token = generateAccessToken({ newUser });
			const url = `${CLIENT_URL}/access/${access_token}`;

			if (validateEmail(account)) {
				sendEmail(account, url, '이메일 인증하기');
				return res.json({ message: '성공! 이메일을 확인해주세요.' });
			}
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
};

export default authController;
