const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

require('./db');

const routes = require('./routes');
const { ValidationError, NotFoundError } = require('./lib/errors');

//Middleware:-
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(express.json({ limit: '100kb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

app.use('/', require('./middlewares/pets'));

module.exports = app;

//Server Start:-
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});