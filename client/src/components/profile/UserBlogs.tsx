import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { IBlog } from '../../utils/types';

import { getBlogsByUserId } from '../../redux/actions/blogAction';

import CardHoriz from '../cards/CardHoriz';
import Loading from '../global/Loading';
import Pagination from '../global/Pagination';
import { RootState } from '../../redux/store';

const UserBlogs = () => {
	const { blogsUser } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const user_id = useParams().slug;

	const [blogs, setBlogs] = useState<IBlog[]>();
	const [total, setTotal] = useState(0);

	const navigate = useNavigate();
	const { search } = useLocation();

	useEffect(() => {
		if (!user_id) return;

		if (blogsUser.every((item) => item.id !== user_id)) {
			dispatch(getBlogsByUserId(user_id, search));
		} else {
			const data = blogsUser.find((item) => item.id === user_id);
			if (!data) return;

			setBlogs(data.blogs);
			setTotal(data.total);
			if (data.search) navigate(data.search);
		}
	}, [user_id, blogsUser, dispatch, search, navigate]);

	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		dispatch(getBlogsByUserId(user_id, search));
	};

	if (!blogs) return <Loading />;

	if (blogs.length === 0 && total < 1)
		return <h3 className='text-center'>블로그 없음</h3>;

	return (
		<div>
			<div>
				{blogs.map((blog) => (
					<CardHoriz key={blog._id} blog={blog} />
				))}
			</div>

			<div>
				<Pagination total={total} callback={handlePagination} />
			</div>
		</div>
	);
};

export default UserBlogs;
