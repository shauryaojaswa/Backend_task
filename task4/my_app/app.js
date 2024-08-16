const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./db');
const Product = require('./models/product');
app.use(express.json());

console.log(Product); // Should output a Mongoose model

// Create a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  product.save()
    .then(savedProduct => {
      res.json(savedProduct);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error creating product' });
    });
});


// Get all products
app.get('/products', (req, res) => {
  Product.find().then((products) => {
    res.json(products);
  }).catch((err) => {
    res.status(500).json({ error: 'Error fetching products' });
  });
});

// Get a product by ID
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  Product.findById(id).then((product) => {
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  }).catch((err) => {
    res.status(500).json({ error: 'Error fetching product' });
  });
});

// Update a product
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;
  Product.findByIdAndUpdate(id, { name, price }, { new: true }).then((product) => {
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  }).catch((err) => {
    res.status(500).json({ error: 'Error updating product' });
  });
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Product.findByIdAndRemove(id).then((product) => {
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  }).catch((err) => {
    res.status(500).json({ error: 'Error deleting product' });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

