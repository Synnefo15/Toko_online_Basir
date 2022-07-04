import React from 'react';
import { useParams } from 'react-router-dom';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, ListGroup, Badge, Button, ListGroupItem } from 'react-bootstrap';
import {Helmet} from 'react-helmet-async';
import Rating from '../components/Rating';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true };
		case 'FETCH_SUCCESS':
			return { ...state, product: action.payload, loading: false };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

const ProductScreen = () => {
	const params = useParams();
	const { slug } = params;
	const [{ loading, error, product }, dispatch] = useReducer(reducer, {
		product: [],
		loading: true,
		error: '',
	});
	const fetchData = async () => {
		dispatch({ type: 'FETCH_REQUEST' });
		try {
			const result = await axios.get(`/api/products/slug/${slug}`);
			dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
		} catch (error) {
			dispatch({ type: 'FETCH_FAIL', payload: error.messages });
		}
		// setProducts(result.data);
	};
	useEffect(() => {
		fetchData();
	}, [slug]);
	return loading ? (
		<div>Loading...</div>
	) : error ? (
		<div>{error}</div>
	) : (
		<div>
			<Row>
				<Col md={6}>
					<img src={product.image} alt={product.name} className="img-large" />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<Helmet>
								<title>{product.name}</title>
							</Helmet>
							<h1>{product.name}</h1>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating rating={product.rating} numReviews={product.numReviews}></Rating>
						</ListGroup.Item>
						<ListGroupItem>price : Rp {product.price}</ListGroupItem>
						<ListGroupItem>
							Description :<p>{product.description}</p>
						</ListGroupItem>
						<ListGroupItem>
							<Row>
								<Col>Status :</Col>
								<Col>
									{product.countInStock > 0 ? (
										<Badge bg="success">Ada</Badge>
									) : (
										<Badge bg="danger">Habis</Badge>
									)}
								</Col>
							</Row>
						</ListGroupItem>
						{/* Jika produk ada */}
						{product.countInStock > 0 && (
							<ListGroupItem>
								<div className=" d-grid ">
									<Button variant="primary tombol">Masukkan Keranjang</Button>
								</div>
							</ListGroupItem>
						)}
					</ListGroup>
				</Col>
			</Row>
		</div>
	);
};

export default ProductScreen;
