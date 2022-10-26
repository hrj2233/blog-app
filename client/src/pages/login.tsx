import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginPass from '../components/auth/LoginPass';
import LoginSMS from '../components/auth/LoginSMS';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import SocialLogin from '../components/auth/SocialLogin';

const Login = () => {
	const [sms, setSms] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { auth } = useSelector((state: RootState) => state);

	useEffect(() => {
		if (auth.access_token) {
			let url = location.search.replace('?', '/');
			return location.search === '' ? navigate('/') : navigate(url);
		}
	}, [auth.access_token, navigate, location.search]);

	return (
		<div className='auth_page'>
			<div className='auth_box'>
				<h2 className='text-uppercase text-center mb-4'>로그인</h2>
				<SocialLogin />
				{sms ? <LoginSMS /> : <LoginPass />}

				<small className='row my-2 text-primary' style={{ cursor: 'pointer' }}>
					<span className='col-6'>
						<Link to='/forgot_password'>비밀번호를 잊어버리셨나요?</Link>
					</span>

					<span className='col-6 text-end' onClick={() => setSms(!sms)}>
						{sms ? '비밀번호로 로그인' : 'SMS로 로그인'}
					</span>
				</small>
				<p>
					계정이 없으신가요?
					<Link to={`/register${location.search}`} style={{ color: 'crimson' }}>
						{` 계정 만들기`}
					</Link>
				</p>
			</div>
		</div>
	);
};
export default Login;
