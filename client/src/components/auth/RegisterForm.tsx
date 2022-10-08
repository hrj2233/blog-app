import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authAction';
import { FormSubmit, InputChange } from '../../utils/types';

const RegisterForm = () => {
	const initialState = { name: '', account: '', password: '', cf_password: '' };
	const [userRegister, setUserRegister] = useState(initialState);
	const { name, account, password, cf_password } = userRegister;

	const [typePass, setTypePass] = useState(false);
	const [typeCfPass, setTypeCfPass] = useState(false);

	const dispatch = useDispatch();

	const handleChangeInput = (e: InputChange) => {
		const { value, name } = e.target;
		setUserRegister({ ...userRegister, [name]: value });
	};

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(register(userRegister));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group mb-3'>
				<label htmlFor='name' className='form-label'>
					Name
				</label>

				<input
					type='text'
					className='form-control'
					id='name'
					name='name'
					value={name}
					onChange={handleChangeInput}
					placeholder='이름은 최대 20글자 입니다.'
				/>
			</div>
			<div className='form-group mb-3'>
				<label htmlFor='account' className='form-label'>
					이메일/ 전화번호
				</label>
				<input
					type='text'
					className='form-control'
					id='account'
					name='account'
					value={account}
					onChange={handleChangeInput}
					placeholder='example@gmail.com/+821012345678'
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
						placeholder='비밀번호는 적어도 6글자 이상이어야 합니다.'
						autoComplete='on'
					/>
					<small onClick={() => setTypePass(!typePass)}>
						{typePass ? '감추기' : '보기'}
					</small>
				</div>
			</div>
			<div className='form-group mb-3'>
				<label htmlFor='cf_password' className='form-label'>
					비밀번호 확인
				</label>
				<div className='pass'>
					<input
						type={typeCfPass ? 'text' : 'password'}
						className='form-control'
						id='cf_password'
						name='cf_password'
						value={cf_password}
						onChange={handleChangeInput}
						placeholder='비밀번호 확인을 위해 한번 더 작성해주세요.'
						autoComplete='on'
					/>
					<small onClick={() => setTypeCfPass(!typeCfPass)}>
						{typeCfPass ? '감추기' : '보기'}
					</small>
				</div>
			</div>
			<button type='submit' className='btn btn-dark w-100 my-1'>
				계정 만들기
			</button>
		</form>
	);
};

export default RegisterForm;
