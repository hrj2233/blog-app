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
				<GoogleOAuthProvider clientId='244726791718-varu7qqugcc2p047vlnchh4s5cl7m2sg.apps.googleusercontent.com'>
					<GoogleLogin onSuccess={onSuccess} />
				</GoogleOAuthProvider>
			</div>
		</>
	);
};

export default SocialLogin;
