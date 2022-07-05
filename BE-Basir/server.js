import express from 'express';
import products from './data/data_products.js';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log(`koneksi sukses to mongo db`);
	})
	.catch((err) => {
		console.log(err.message);
	});

const app = express();

app.get('/', (req, res) => {
	res.send(`Default Page`);
});

app.get('/api/products', (req, res) => {
	res.send(products);
});
app.get('/api/products/slug/:slug', (req, res) => {
	const product = products.find((x) => x.slug === req.params.slug);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'product not found' });
	}
});
app.get('/api/products/:id', (req, res) => {
	const product = products.find((x) => x._id === req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: 'product not found' });
	}
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`serve at http://localhost:${port}`);
});
