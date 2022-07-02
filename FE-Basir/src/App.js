import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Tes from './screens/Tes';

function App() {
	return (
		<BrowserRouter>
			<div>
				<header>
					<Link to="/">Bekasmu</Link>
				</header>
				<main>
					<Routes>
						<Route path='/' element={<HomeScreen />}/>
						<Route path='/product/:slug' element={<ProductScreen />}/>
						<Route path='/tes' element={<Tes />}/>
					</Routes>
					
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
