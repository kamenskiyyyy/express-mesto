const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  createUser,
  login
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const {
  validateSignUp,
  validateSignIn
} = require('./middlewares/validation');
const {
  requestLogger,
  errorLogger
} = require('./middlewares/logger');
const { errors } = require('celebrate');

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет :с');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.get('/*', (req, res) => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'Произошла ошибка на сервере' : message,
    });
  next();
});

app.listen(PORT);
