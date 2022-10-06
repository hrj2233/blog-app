import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
	const loginLinks = [
		{ label: 'Login', path: '/login' },
		{ label: 'Register', path: '/register' },
	];
	return (
		<ul className='navbar-nav ms-auto'>
			{loginLinks.map((link, index) => (
				<li key={index} className='nav-item'>
					<Link className='nav-link' to={link.path}>
						{link.label}
					</Link>
				</li>
			))}

			<li className='nav-item dropdown'>
				<span
					className='nav-link dropdown-toggle'
					id='navbarDropdown'
					role='button'
					data-bs-toggle='dropdown'
					aria-expanded='false'
				>
					유저
				</span>

				<ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
					<li>
						<Link className='dropdown-item' to='/profile'>
							프로필
						</Link>
					</li>
					<li>
						<hr className='dropdown-divider' />
					</li>
					<li>
						<Link className='dropdown-item' to='/'>
							로그아웃
						</Link>
					</li>
				</ul>
			</li>
		</ul>
	);
};

export default Menu;
