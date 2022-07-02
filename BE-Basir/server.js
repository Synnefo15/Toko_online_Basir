import express from 'express';
import products from './data/data_products.js';

const app = express();

app.get('/',(req,res) => { 
	res.send(`Default Page`)
 })

app.get('/api/products', (req, res) => {
	res.send(products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`serve at http://localhost:${port}`);
});
