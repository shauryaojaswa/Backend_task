const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'my_secret_key';
app.use(express.json());

let users = [];

// Register user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = { id: users.length + 1, username, password: bcrypt.hashSync(password, 10) };
  users.push(user);
  res.send(`User created: ${username}`);
});

// Login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  res.send({ token });
});

// Middleware to authenticate and validate JWT
function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Unauthorized');
  const token = authHeader.split(' ')[1]; // Extract the token from the header
  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
}

// Protected route: /profile
app.get('/profile', authenticate, (req, res) => {
  res.send(`Welcome, user ${req.userId}!`);
});

// Protected route: /settings
app.get('/settings', authenticate, (req, res) => {
  res.send(`Settings for user ${req.userId}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});