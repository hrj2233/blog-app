import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
	return (
		<header style={{ position: 'sticky', top: 0, left: 0, zIndex: 2 }}>
			<nav className='navbar navbar-expand-lg navbar-light bg-light p-3'>
				<h1>
					<Link className='navbar-brand' to='/'>
						Blog
					</Link>
				</h1>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarNav'>
					<Search />
					<Menu />
				</div>
			</nav>
		</header>
	);
};

export default Header;
