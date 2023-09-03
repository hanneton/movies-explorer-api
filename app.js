require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cacheControl = require('./middlewares/cacheControl');
const router = require('./routes/router');
const { centralErrorsHandler } = require('./middlewares/centralErrorsHandler');

const {
  PORT = 3000,
  mongodbAddress = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();

mongoose.connect(mongodbAddress);

app.use(bodyParser.json());

app.use(cacheControl);

app.use(requestLogger);

app.use(helmet());

app.use('/', router);

app.use(errorLogger);

app.use(errors());// celebrate's errors handler

app.use(centralErrorsHandler);

app.listen(PORT);
