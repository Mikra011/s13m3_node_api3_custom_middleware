const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// Middlewares

function customMorgan(req, res, next) {
  console.log(`hey a ${req.method} request made`);
  next();
}

function shortCircuit(req, res, next) {
  res.json('the request was short cicuited');
}

function addFriend(req, res, next) {
  req.friend = 'Lady G';
  next();
}

// Middlewares  

// Order matter!!

server.use(express.json());
server.use(morgan('dev'));
server.use(customMorgan);
// server.use(shortCircuit);
server.use(addFriend);

// Order matter!!

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Hubs API ${req.friend}</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
