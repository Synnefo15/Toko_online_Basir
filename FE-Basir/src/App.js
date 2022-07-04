import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Tes from './screens/Tes';
import {Navbar,Container, Nav, Badge} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap';
import {useContext} from 'react';
import { Store } from './Store';

function App() {
	const { state } = useContext(Store);
	const {cart} = state

	return (
		<BrowserRouter>
			<div className='d-flex flex-column site-container'>
				<header>
					<Navbar bg="dark" variant="dark">
						<Container>
							<LinkContainer to="/">
								<Navbar.Brand>Bekasmu</Navbar.Brand>
							</LinkContainer>
							<Nav className='me-auto'>
								<Link to="/cart" className='nav-link'>
									Keranjang
									{
										cart.cartItems.length > 0 && (
											<Badge pill bg="danger">
												{cart.cartItems.length}
											</Badge>
										)
									}
								</Link>
							</Nav>
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
