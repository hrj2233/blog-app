import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Alert } from './components/alert/Alert';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import PageRender from './PageRender';
import Home from './pages/home';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';
import { getCategories } from './redux/actions/categoryAction';
import { getHomeBlogs } from './redux/actions/blogAction';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHomeBlogs());
		dispatch(getCategories());
		dispatch(refreshToken());
	}, [dispatch]);

	return (
		<div className='container'>
			<Router>
				<Alert />
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/:page' element={<PageRender />} />
					<Route path='/:page/:slug' element={<PageRender />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
