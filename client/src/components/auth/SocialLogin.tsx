import { useDispatch } from 'react-redux';
import { googleLogin } from '../../redux/actions/authAction';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const SocialLogin = () => {
	const dispatch = useDispatch();

	const onSuccess = (googleUser: any) => {
		const id_token = googleUser.credential;
		dispatch(googleLogin(id_token));
	};

	return (
		<>
			<div className='my-4'>
				<GoogleOAuthProvider clientId='731783632391-klu7k4chlv8kk0mkde2m4t8bp7j058p6.apps.googleusercontent.com'>
					<GoogleLogin onSuccess={onSuccess} />
				</GoogleOAuthProvider>
			</div>
		</>
	);
};

export default SocialLogin;
