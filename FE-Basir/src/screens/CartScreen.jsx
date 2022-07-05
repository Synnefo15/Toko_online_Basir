import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Store } from '../Store'
import {Button, Card, Col, ListGroup, Row} from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

const CartScreen = () => {
  const {state, dispatch: ctxDispatch}= useContext(Store)
  const {
    cart:{cartItems},
  }=state
  return (
		<div>
			<Helmet>
				<title>Keranjang belanja</title>
			</Helmet>
			<h1>Keranjang Belanja</h1>
			<Row>
				<Col md={8}>
					{cartItems.length === 0 ? (
						<MessageBox>
							Keranjang kosong. <Link to="/">Belanja Sekarang</Link>
						</MessageBox>
					) : (
						<ListGroup>
							{cartItems.map((item) => (
								<ListGroup.Item key={item._id}>
									<Row className="align-items-center">
										<Col md={4}>
											<img
												src={item.image}
												alt={item.name}
												className="img-fluid rounded img-thumbnail"
                        style={{ "height":"80px" }}
											/>{' '}
											<Link to={`/product/${item.slug}`}>{item.name}</Link>
										</Col>
										<Col md={3}>
											<Button variant="light" disabled={item.quantity === 1}>
												<i className="fas fa-minus-circle"></i>
											</Button>
											{` `}
											<span>{item.quantity}</span>
											{` `}
											<Button variant="light" disabled={item.quantity === item.countInStock}>
												<i className="fas fa-plus-circle"></i>
											</Button>
										</Col>
										<Col md={3}>{item.price}</Col>
										<Col md={2}>
											<Button variant="light">
												<i className="fas fa-trash"></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<Card.Body>
							<ListGroup.Item>
								<h3>
									Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):
									<div>
										Rp.
										{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
									</div>
								</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<div className="d-grid">
									<Button type="button" variant="primary" disabled={cartItems.length === 0}>
										Lanjut Checkout
									</Button>
								</div>
							</ListGroup.Item>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default CartScreen