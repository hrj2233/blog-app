import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRender from './PageRender';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<PageRender />} />
				<Route path='/:page' element={<PageRender />} />
				<Route path='/:page/:slug' element={<PageRender />} />
			</Routes>
		</Router>
	);
};

export default App;
