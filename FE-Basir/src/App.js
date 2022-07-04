import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Tes from './screens/Tes';
import {Navbar,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';

function App() {
	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<header>
					<Navbar bg="dark" variant="dark">
						<Container>
							<LinkContainer to="/">
								<Navbar.Brand>Bekasmu</Navbar.Brand>
							</LinkContainer>
						</Container>
					</Navbar>
				</header>
				<main>
					<Container className='mt-3'>
						<Routes>
							<Route path="/" element={<HomeScreen />} />
							<Route path="/product/:slug" element={<ProductScreen />} />
							<Route path="/tes" element={<Tes />} />
						</Routes>
					</Container>
				</main>
				<footer>
					<div className='text-center mb-4'>Hak Cipta oleh</div>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
