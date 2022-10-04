import { Request, Response } from 'express';
import Users from '../models/User';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../config/generateToken';

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

			res.json({
				status: 'OK',
				message: '회원가입이 완료되었습니다.',
				data: newUser,
				access_token,
			});
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
};

export default authController;
