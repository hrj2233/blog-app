import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getBlogsByCategoryId } from '../../redux/actions/blogAction';

import { RootState } from '../../redux/store';
import { IBlog } from '../../utils/types';

import Loading from '../../components/global/Loading';
import Pagination from '../../components/global/Pagination';
import CardVert from '../../components/cards/CardVert';

const BlogsByCategory = () => {
	const { categories, blogsCategory } = useSelector(
		(state: RootState) => state
	);
	const dispatch = useDispatch();
	const { slug } = useParams();

	const [categoryId, setCategoryId] = useState('');
	const [blogs, setBlogs] = useState<IBlog[]>();
	const [total, setTotal] = useState(0);

	const navigate = useNavigate();
	const { search } = useLocation();

	useEffect(() => {
		const category = categories.find((item) => item.name === slug);
		if (category) setCategoryId(category._id);
	}, [categories, slug]);

	useEffect(() => {
		if (!categoryId) return;

		if (blogsCategory.every((item) => item.id !== categoryId)) {
			dispatch(getBlogsByCategoryId(categoryId, search));
		} else {
			const data: any = blogsCategory.find((item) => item.id === categoryId);
			if (!data) return;
			setBlogs(data.blogs);
			setTotal(data.total);

			if (data.search) navigate(data.search);
		}
	}, [categoryId, blogsCategory, dispatch, search, navigate]);

	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		dispatch(getBlogsByCategoryId(categoryId, search));
	};

	if (!blogs) return <Loading />;
	return (
		<div className='blogs_category'>
			<div className='show_blogs'>
				{blogs.map((blog) => (
					<CardVert key={blog._id} blog={blog} />
				))}
			</div>

			{total > 1 && <Pagination total={total} callback={handlePagination} />}
		</div>
	);
};

export default BlogsByCategory;
