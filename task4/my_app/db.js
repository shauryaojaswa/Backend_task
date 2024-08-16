


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/');

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  console.log('Database name:', mongoose.connection.db.databaseName);
});

