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
				<GoogleOAuthProvider clientId='884830555574-d8vc5mir0dikhobd7bsl88l7052ipqde.apps.googleusercontent.com'>
					<GoogleLogin onSuccess={onSuccess} />
				</GoogleOAuthProvider>
			</div>
		</>
	);
};

export default SocialLogin;
