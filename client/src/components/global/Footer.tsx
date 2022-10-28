const Footer = () => {
	return (
		<footer
			className='text-center bg-light py-4 w-100'
			style={{
				width: '100%',
				bottom: '0px',
				position: 'absolute',
			}}
		>
			<h2>블로그에 오신걸 환영합니다.</h2>
			<a className='mb-2 d-block' href='/' target='_blank' rel='noreferrer'>
				Blog
			</a>
			<p>Copyright &copy; {new Date().getFullYear()}</p>
		</footer>
	);
};

export default Footer;
