import { Link, useLocation } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
	const location = useLocation();

	return (
		<div className='auth_page'>
			<div className='auth_box'>
				<h2 className='text-uppercase text-center mb-4'>계정 만들기</h2>
				<RegisterForm />
				<p className='mt-2'>
					{`이미 계정이 있으신가요? `}
					<Link to={`/login${location.search}`} style={{ color: 'crimson' }}>
						로그인 하기
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
