import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { IBlog } from '../../utils/types';
import NotFound from '../../components/global/NotFound';
import CardVert from '../../components/cards/CardVert';
import { getBlogsByCategoryId } from '../../redux/actions/blogAction';

const BlogsByCategory = () => {
	const { categories, blogsCategory } = useSelector(
		(state: RootState) => state
	);
	const dispatch = useDispatch();
	const { slug } = useParams();

	const [categoryId, setCategoryId] = useState('');
	const [blogs, setBlogs] = useState<IBlog[]>();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const category = categories.find((item) => item.name === slug);
		if (category) setCategoryId(category._id);
	}, [categories, slug]);

	useEffect(() => {
		if (!categoryId) return;

		if (blogsCategory.every((item) => item.id !== categoryId)) {
			dispatch(getBlogsByCategoryId(categoryId));
		} else {
			const data = blogsCategory.find((item) => item.id === categoryId);
			if (!data) return;
			setBlogs(data.blogs);
			setTotal(data.total);
		}
	}, [categoryId, blogsCategory, dispatch]);

	if (!blogs) return <NotFound />;

	return (
		<div>
			<div className='blogs_category'>
				<div className='show_blogs'>
					{blogs.map((blog) => (
						<CardVert key={blog._id} blog={blog} />
					))}
				</div>
			</div>
		</div>
	);
};

export default BlogsByCategory;
