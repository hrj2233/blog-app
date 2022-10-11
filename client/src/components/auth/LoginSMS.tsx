import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSMS } from '../../redux/actions/authAction';
import { FormSubmit } from '../../utils/types';

const LoginSMS = () => {
	const [phone, setPhone] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e: FormSubmit) => {
		e.preventDefault();
		dispatch(loginSMS(phone));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group mb-3'>
				<label htmlFor='phone' className='form-label'>
					전화번호
				</label>
				<input
					type='text'
					className='form-control'
					id='phone'
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					placeholder='+821012345678'
				/>
			</div>
			<button
				type='submit'
				className='btn btn-dark w-100'
				disabled={phone ? false : true}
			>
				로그인
			</button>
		</form>
	);
};

export default LoginSMS;
