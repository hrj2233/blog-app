import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CardVert from '../components/cards/CardVert';
import Loading from '../components/global/Loading';
import { RootState } from '../redux/store';

const Home = () => {
	const { homeBlogs } = useSelector((state: RootState) => state);

	if (homeBlogs.length === 0) return <Loading />;
	return (
		<main className='home_page'>
			{homeBlogs.map((homeBlog) => (
				<section key={homeBlog._id}>
					{homeBlog.count > 0 && (
						<>
							<h2>
								<Link to={`/blogs/${homeBlog.name.toLowerCase()}`}>
									{homeBlog.name} <small>({homeBlog.count})</small>
								</Link>
							</h2>
							<hr className='mt-1' />

							<div className='home_blogs'>
								{homeBlog.blogs.map((blog) => (
									<CardVert key={blog._id} blog={blog} />
								))}
							</div>
						</>
					)}

					{homeBlog.count > 4 && (
						<Link
							className='text-end d-block mt-2 mb-3 text-decoration-none'
							to={`/blogs/${homeBlog.name}`}
						>
							더보기 &gt;&gt;
						</Link>
					)}
				</section>
			))}
		</main>
	);
};

export default Home;
