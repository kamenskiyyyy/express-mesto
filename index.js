const express = require('express');

const {PORT = 3000} = process.env;
const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
})

app.get('/', (req, res) => {
  res.send('hello world 123');
});

app.post('/', express.json(), (req, res) => {
  res.send(req.body);
})

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`)
})