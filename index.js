'use strict';
const express = require('express');

const app = express();
const port = 3000 || 8080;

// app.use(express.static('client/dist'));
app.use(express.static('client/src')); // remove later

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.sendFile('/client/src/index.html');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user');
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Example app listening on port ${port}`);
});
