import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import Categories from '../models/Category';

const categoryController = {
	getCategories: async (req: Request, res: Response) => {
		try {
			const categories = await Categories.find().sort('-createdAt');
			res.json({ categories });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	createCategory: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		if (req.user.role !== 'admin')
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		try {
			const name = req.body.name.toLowerCase();
			const newCategory = new Categories({ name });
			await newCategory.save();

			res.json({ newCategory });
		} catch (err: any) {
			let errMsg;

			if (err.code === 11000) {
				errMsg = Object.values(err.keyValue)[0] + ' 이미 존재합니다.';
			} else {
				let name = Object.keys(err.errors)[0];
				errMsg = err.errors[`${name}`].message;
			}

			return res.status(500).json({ message: errMsg });
		}
	},
	updateCategory: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		if (req.user.role !== 'admin')
			return res.status(400).json({ message: '잘못된 인증입니다.' });

		try {
			const category = await Categories.findOneAndUpdate(
				{
					_id: req.params.id,
				},
				{ name: req.body.name }
			);

			res.json({ message: '업데이트 성공!' });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
	deleteCategory: async (req: IReqAuth, res: Response) => {
		if (!req.user)
			return res.status(400).json({ message: '잘못된 인증입니다.' });
		if (req.user.role !== 'admin')
			return res.status(400).json({ message: '잘못된 인증입니다.' });

		try {
			const category = await Categories.findByIdAndDelete(req.params.id);
			res.json({ message: '삭제 성공!' });
		} catch (err: any) {
			return res.status(500).json({ message: err.message });
		}
	},
};

export default categoryController;
