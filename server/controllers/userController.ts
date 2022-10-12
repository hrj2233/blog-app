import { Response } from 'express';
import { IReqAuth } from '../config/interface';
import Users from '../models/User';

const userController = {
	updateUser: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		try {
			const { avatar, name } = req.body;
			await Users.findOneAndUpdate({ _id: req.user._id }, { avatar, name });
			res.json({ message: '업데이트 성공!' });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
};

export default userController;
