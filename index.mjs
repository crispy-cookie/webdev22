'use strict';
import path from 'path';
import express from 'express';
// import { initializeDatabase, seatings, Events, guests } from './server/mongooseBasis.mjs';
import { initializeDatabase,Events,Seatings,Guests } from './server/mongooseBasis.mjs';
import { server } from './server/expressBasis.mjs';

import mongoose from 'mongoose';

const app = express();
const port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : '8080';
const staticPath = path.join(path.dirname(process.argv[1]), path.join('client', 'dist')); // Pfad aendern falls /index.mjs zu /server/expressBasis.js wird -> '../client/dist/'

app.use(express.static(staticPath));
app.use(server);

initializeDatabase();

// test-Veranstaltung DummyDaten
(async function () {
  const guestTest1 = new Guests({
    _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001'),
    name: 'Max Muster',
    has_child: false,
    status: 'unbekannt'
  });

  const guestTest2 = new Guests({
    _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000002'),
    name: 'Kevin Kuster',
    has_child: false,
    status: 'eingeladen'
  });

  guestTest1.save();
  guestTest2.save();

  const testSeating = new Seatings({
    _id: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001'),
    count_table: 10,
    count_seats_per_table: 4,
    seat_variant: 'zweiseitig',
    seat_mapping: []
  });
  testSeating.save();

  const testEvent1 = new Events({
    _id: mongoose.Types.ObjectId('6eb6e7e7e9b7f4194e000001'),
    name: 'test1',
    timestamp: new Date('1995-12-17T03:24:00'),
    seating: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001'),
    guestlist: [mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001'), mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000002')]
  });

  await Seatings.updateOne(
    { _id: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001') },
    { $set: { associated_event: mongoose.Types.ObjectId('6eb6e7e7e9b7f4194e000001') } }
  );

  let map = new Map();
  map.set("1",[mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001'), mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000002')]);
  map.set('2', []);
  map.set('3', []);
  map.set('4', []);
  map.set('5', []);
  map.set('6', []);
  map.set('7', []);
  map.set('8', []);
  map.set('9', []);
  map.set('10', []);


 await Seatings.updateOne(
    { _id: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001') },
    { $set: { seat_mapping: map } }
  );

  testEvent1.save();
});

// function um Testdaten zulöschen

(async function () {
  await Events.deleteMany({ _id: mongoose.Types.ObjectId('6eb6e7e7e9b7f4194e000001') }).then(function () {
    console.log('Data deleted!');
  }).catch(function (error) {
    console.log(error);
  });
  await Guests.deleteMany({ _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001') }).then(function () {
    console.log('Data deleted!');
  }).catch(function (error) {
    console.log(error);
  });
  await Guests.deleteMany({ _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000002') }).then(function () {
    console.log('Data deleted!');
  }).catch(function (error) {
    console.log(error);
  });
  await Seatings.deleteMany({ _id: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001') }).then(function () {
    console.log('Data deleted!');
  }).catch(function (error) {
    console.log(error);
  });
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.sendFile(staticPath + '/index.html');
});

app.get('/index', (req, res) => {
  res.sendFile(staticPath + '/index.html');
});

app.get('/listevents', (req, res) => {
  res.sendFile(staticPath + '/html/listevents.html');
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
      res.sendFile(staticPath + '/html/guestlist.html');
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
      res.sendFile(staticPath + '/html/seatinglist.html');
    }
  }
  catch (err) {
    res.sendStatus(404);
  }
});

app.get('/addevent', (req,res)=>{
  res.sendFile(staticPath+'/html/addevent.html');
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Example app listening on port ${port}`);
  console.log(staticPath);
});
