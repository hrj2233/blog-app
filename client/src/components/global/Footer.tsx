const Footer = () => {
	return (
		<div className='text-center bg-light py-4'>
			<h2>블로그앱에 오신걸 환영합니다.</h2>
			<a
				className='mb-2 d-block'
				href='http://localhost:3000'
				target='_blank'
				rel='noreferrer'
			>
				blog app
			</a>
			<p>Copyright &copy; {new Date().getFullYear()}</p>
		</div>
	);
};

export default Footer;
