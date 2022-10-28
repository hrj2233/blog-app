import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import NotFound from '../components/global/NotFound';
import { RootState } from '../redux/store';
import { IBlog, IUser } from '../utils/types';

import ReactQuill from '../components/editor/ReactQuill';
import { shallowEqual, validCreateBlog } from '../utils/valid';
import { alertActions } from '../redux/reducers/alertReducer';
import { createBlog, updateBlog } from '../redux/actions/blogAction';
import { getAPI } from '../utils/fetchData';

interface IProps {
	id?: string;
}

const CreateBlog: React.FC<IProps> = ({ id }) => {
	const initState = {
		user: '',
		title: '',
		content: '',
		description: '',
		thumbnail: '',
		category: '',
		createdAt: new Date().toISOString(),
	};

	const [blog, setBlog] = useState<IBlog>(initState);
	const [body, setBody] = useState('');

	const divRef = useRef<HTMLDivElement>(null);
	const [text, setText] = useState('');

	const { auth } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();
	const [oldData, setOldData] = useState<IBlog>(initState);

	useEffect(() => {
		if (!id) return;

		getAPI(`blog/${id}`)
			.then((res) => {
				setBlog(res.data);
				setBody(res.data.content);
				setOldData(res.data);
			})
			.catch((err) => console.log(err));

		const initData = {
			user: '',
			title: '',
			content: '',
			description: '',
			thumbnail: '',
			category: '',
			createdAt: new Date().toISOString(),
		};

		return () => {
			setBlog(initData);
			setBody('');
			setOldData(initData);
		};
	}, [id]);

	useEffect(() => {
		const div = divRef.current;
		if (!div) return;

		const text = div?.innerText as string;
		setText(text);
	}, [body]);

	const handleSubmit = async () => {
		if (!auth.access_token) return;

		const check = validCreateBlog({ ...blog, content: text });
		if (check.errLength !== 0) {
			return dispatch(alertActions.getAlert({ errors: check.errMsg }));
		}

		let newData = { ...blog, content: body };

		if (id) {
			if ((blog.user as IUser)._id !== auth.user?._id)
				return dispatch(
					alertActions.getAlert({ errors: '잘못된 인증입니다.' })
				);

			const result = shallowEqual(oldData, newData);
			if (result)
				return dispatch(
					alertActions.getAlert({ errors: '데이터는 변경되지 않습니다.' })
				);

			dispatch(updateBlog(newData, auth.access_token));
		} else {
			dispatch(createBlog(newData, auth.access_token));
		}
	};

	if (!auth.access_token) return <NotFound />;

	return (
		<main className='my-4 create_blog'>
			<div className='row mt-4'>
				<div className='col-md-6'>
					<h2>생성</h2>
					<CreateForm blog={blog} setBlog={setBlog} />
				</div>

				<div className='col-md-6'>
					<h2>미리보기</h2>
					<CardHoriz blog={blog} />
				</div>
			</div>

			<ReactQuill setBody={setBody} body={body} />

			<div
				ref={divRef}
				dangerouslySetInnerHTML={{
					__html: body,
				}}
				style={{ display: 'none' }}
			/>

			<small>{text.length}</small>

			<button
				className='btn btn-dark mt-3 d-block mx-auto'
				onClick={handleSubmit}
			>
				{id ? '게시물 업데이트' : '게시물 작성'}
			</button>
		</main>
	);
};

export default CreateBlog;
