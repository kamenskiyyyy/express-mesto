const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const userRouter = require('./routes/users')
const cardRouter = require('./routes/cards')

const {PORT = 3000} = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '6081a2aa2988e9479999794b',
  };
  next();
})

app.use('/', userRouter);
app.use('/', cardRouter);

app.listen(PORT);