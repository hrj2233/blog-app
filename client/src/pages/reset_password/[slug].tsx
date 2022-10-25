import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FormSubmit } from '../../utils/types';

import { resetPassword } from '../../redux/actions/userAction';

const ResetPassword = () => {
	const token = useParams().slug;
	const dispatch = useDispatch();

	const [password, setPassword] = useState('');
	const [cf_password, setCfPassword] = useState('');
	const [typePass, setTypePass] = useState(false);
	const [typeCfPass, setTypeCfPass] = useState(false);

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(resetPassword(password, cf_password, token));
	};

	return (
		<div className='auth_page'>
			<form className='auth_box' onSubmit={handleSubmit}>
				<h3 className='text-uppercase text-center mb-4'>비밀번호 재설정</h3>

				<div className='form-group my-2'>
					<label htmlFor='password' className='form-label'>
						비밀번호
					</label>
					<div className='pass'>
						<input
							type={typePass ? 'text' : 'password'}
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<small onClick={() => setTypePass(!typePass)}>
							{typePass ? '숨기기' : '보기'}
						</small>
					</div>
				</div>

				<div className='form-group my-2'>
					<label htmlFor='password' className='form-label'>
						비밀번호 확인
					</label>
					<div className='pass'>
						<input
							type={typeCfPass ? 'text' : 'password'}
							className='form-control'
							id='password'
							name='password'
							value={cf_password}
							onChange={(e) => setCfPassword(e.target.value)}
						/>
						<small onClick={() => setTypeCfPass(!typeCfPass)}>
							{typeCfPass ? '숨기기' : '보기'}
						</small>
					</div>
				</div>

				<button type='submit' className='btn btn-dark w-100 mt-2'>
					설정하기
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
