'use strict';
import path from 'path';
import express from 'express';

const app = express();
const port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : '8080';
const staticPath = path.join(path.dirname(process.argv[1]), path.join('client', 'dist')); // Pfad aendern falls /index.mjs zu /server/expressBasis.js wird -> '../client/dist/'

app.use(express.static(staticPath));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.sendFile('/client/dist/index.html');
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
