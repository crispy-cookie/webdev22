'use strict';
import path from 'path';
import express from 'express';
import { initializeDatabase,Events,Seatings,Guests } from './server/mongooseBasis.mjs';
import { server } from './server/expressBasis.mjs';

import mongoose from 'mongoose';

const app = express();
const port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : '8080';
const staticPath = path.join(path.dirname(process.argv[1]), path.join('client', 'dist')); // Pfad aendern falls /index.mjs zu /server/expressBasis.js wird -> '../client/dist/'

app.use(express.static(staticPath));
app.use(server);

initializeDatabase();

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.sendFile(`${staticPath}/index.html`);
});

app.get('/index', (req, res) => {
  res.sendFile(`${staticPath}/index.html`);
});

app.get('/listevents', (req, res) => {
  res.sendFile(`${staticPath}/html/listevents.html`);
});

app.get('/guestlist', async (req,res)=>{
  const eventId = req.query.event ;
  if(!eventId){
    res.sendStatus(406);
  }
  try {
    const objId = mongoose.Types.ObjectId(eventId.toString());
    if (!(await Events.exists({ _id: objId }))) {
      res.sendStatus(404);
    } else {
      res.sendFile(`${staticPath}/html/guestlist.html`);
    }
  }
  catch (err) {
    res.sendStatus(404);
  }
});

app.get('/seatinglist', async (req,res)=>{
  const eventId = req.query.event;
  if(!eventId){
    res.sendStatus(406);
  }
  try {
    const objId = mongoose.Types.ObjectId(eventId.toString());
    if (!(await Events.exists({ _id: objId }))) {
      res.sendStatus(406);
    } else {
      res.sendFile(`${staticPath}/html/seatinglist.html`);
    }
  }
  catch (err) {
    res.sendStatus(404);
  }
});

app.get('/addevent', (req,res)=>{
  res.sendFile(`${staticPath}/html/addevent.html`);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Example app listening on port ${port}`);
  console.log(staticPath);
});
