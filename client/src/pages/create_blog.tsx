import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import NotFound from '../components/global/NotFound';
import { RootState } from '../redux/store';
import { IBlog } from '../utils/types';

import ReactQuill from '../components/editor/ReactQuill';
import { validCreateBlog } from '../utils/valid';
import { alertActions } from '../redux/reducers/alertReducer';
import { createBlog } from '../redux/actions/blogAction';

const CreateBlog = () => {
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

	const { auth, categories } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

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

		dispatch(createBlog(newData, auth.access_token));
	};

	if (!auth.access_token) return <NotFound />;

	return (
		<div className='my-4 create_blog'>
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

			<ReactQuill setBody={setBody} />

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
				포스트 생성
			</button>
		</div>
	);
};

export default CreateBlog;
