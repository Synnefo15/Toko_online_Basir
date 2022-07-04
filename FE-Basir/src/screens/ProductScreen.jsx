import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, ListGroup, Badge, Button, ListGroupItem } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Rating from '../components/Rating';
import cssModule from '../styles/produk_detail.module.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {getError} from '../utils/utils'
import { Store } from '../Store';

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
			dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
		}
		// setProducts(result.data);
	};
	useEffect(() => {
		fetchData();
	}, [slug]);

	const{state, dispatch:ctxDispatch} = useContext(Store)
	
	const addToCart = ()=>{
		ctxDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity:1}})
	}
	
	return loading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox variant="danger">{error}</MessageBox>
	) : (
		<div>
			<Row>
				<Col md={6}>
					<img src={product.image} alt={product.name} className={cssModule.imgLarge} />
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
							<Row className="">
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
									<Button onClick={addToCart} variant={`primary ${cssModule.tombol}`}>
										Masukkan Keranjang
									</Button>
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
