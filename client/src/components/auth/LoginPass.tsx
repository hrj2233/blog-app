import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/authAction';
import { FormSubmit, InputChange } from '../../utils/types';

const LoginPass = () => {
	const initialStatae = { account: '', password: '' };
	const [userLogin, setUserLogin] = useState(initialStatae);
	const { account, password } = userLogin;

	const [typePass, setTypePass] = useState(false);

	const dispatch = useDispatch();

	const handleChangeInput = (e: InputChange) => {
		const { value, name } = e.target;
		setUserLogin({ ...userLogin, [name]: value });
	};

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(login(userLogin));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group mb-3'>
				<label htmlFor='account' className='form-label'>
					이메일 / 전화번호
				</label>
				<input
					type='text'
					className='form-control'
					id='account'
					name='account'
					value={account}
					onChange={handleChangeInput}
					autoComplete='on'
				/>
			</div>
			<div className='form-group mb-3'>
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
						onChange={handleChangeInput}
						autoComplete='on'
					/>
					<small onClick={() => setTypePass(!typePass)}>
						{typePass ? '숨기기' : '보기'}
					</small>
				</div>
			</div>
			<button
				type='submit'
				className='btn btn-dark w-100 mt-1'
				disabled={account && password ? false : true}
			>
				로그인
			</button>
		</form>
	);
};

export default LoginPass;
