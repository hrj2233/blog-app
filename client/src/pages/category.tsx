import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../components/global/NotFound';
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '../redux/actions/categoryAction';
import { RootState } from '../redux/store';
import { FormSubmit, ICategory } from '../utils/types';

const Category = () => {
	const [name, setName] = useState('');
	const [edit, setEdit] = useState<ICategory | null>(null);

	const { auth, categories } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (edit) setName(edit.name);
	}, [edit]);

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		if (!auth.access_token || !name) return;
		if (edit) {
			if (edit.name === name) return;
			const data = { ...edit, name };
			dispatch(updateCategory(data, auth.access_token));
		} else {
			dispatch(createCategory(name, auth.access_token));
		}
		setName('');
		setEdit(null);
	};

	const handleDelete = (id: string) => {
		if (!auth.access_token) return;
		if (window.confirm('이 카테고리를 삭제하시겠습니까?')) {
			dispatch(deleteCategory(id, auth.access_token));
		}
		setName('');
		setEdit(null);
	};

	if (auth.user?.role !== 'admin') return <NotFound />;

	return (
		<div className='category'>
			<form onSubmit={handleSubmit}>
				<label htmlFor='category'>카테고리</label>

				<div className='d-flex align-items-center'>
					{edit && (
						<i
							className='fas fa-times mx-2 text-danger'
							style={{ cursor: 'pointer' }}
							onClick={() => setEdit(null)}
						></i>
					)}
					<input
						type='text'
						name='category'
						id='category'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<button type='submit'>{edit ? '업데이트' : '생성'}</button>
				</div>
			</form>

			<div>
				{categories.map((category) => (
					<div className='category_row' key={category._id}>
						<p className='m-0 text-capitalize'>{category.name}</p>

						<div>
							<i
								className='fas fa-edit mx-2'
								onClick={() => setEdit(category)}
							/>
							<i
								className='fas fa-trash-alt'
								onClick={() => handleDelete(category._id)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Category;
