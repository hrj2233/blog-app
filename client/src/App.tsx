import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alert from './components/alert/Alert';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import PageRender from './PageRender';

const App = () => {
	return (
		<div className='container'>
			<Router>
				<Alert />
				<Header />
				<Routes>
					<Route path='/' element={<PageRender />} />
					<Route path='/:page' element={<PageRender />} />
					<Route path='/:page/:slug' element={<PageRender />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
