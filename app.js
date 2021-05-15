const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  createUser,
  login
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const cors = require('cors');
const {
  requestLogger,
  errorLogger
} = require('./middlewares/logger');

dotenv.config();
const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: 'mesto.kamenskiyyyy.nomoredomains.club',
};

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message
  } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'Произошла ошибка на сервере' : message,
    });
});

app.get('/*', (req, res) => {
  res.status(404)
    .send({ message: 'ресурс не найден' });
});

app.listen(PORT);
