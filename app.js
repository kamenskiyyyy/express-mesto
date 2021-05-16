const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');

dotenv.config();
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const whitelist = [
  'http://localhost:3000',
  'https://mesto.kamenskiyyyy.nomoredomains.club/',
  'http://mesto.kamenskiyyyy.nomoredomains.club/',
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login); // вторым аргументом передаем middleware для валидации приходящих данных до обращения к бд
app.post('/signup', validateSignUp, createUser);


app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.all('/*', () => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка на сервере' : message,
  });
  next();
});
app.listen(PORT);
