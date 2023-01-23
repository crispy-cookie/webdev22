'use strict';
import path from 'path';
import express from 'express';
import { initializeDatabase, seatings } from './server/mongooseBasis.mjs';
import { server } from './server/expressBasis.mjs';
import { events, guests} from './server/mongooseBasis.mjs';
import mongoose from 'mongoose';

const app = express();
const port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : '8080';
const staticPath = path.join(path.dirname(process.argv[1]), path.join('client', 'dist')); // Pfad aendern falls /index.mjs zu /server/expressBasis.js wird -> '../client/dist/'

app.use(express.static(staticPath));
app.use(server);

initializeDatabase();

//test-Veranstaltung DummyDaten
(async function () {

  const guest_test1 = new guests({
    _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001'),
    name: 'Max Muster',
    has_child: false,
    status: 'unbekannt'
  });


  const guest_test2 = new guests({
    _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000002'),
    name: 'Kevin Kuster',
    has_child: false,
    status: 'eingeladen'
  });

  guest_test1.save();
  guest_test2.save();
  
  const test_seating = new seatings({
    _id: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001'),
    count_table: 10,
    count_seats_per_table: 4,
    seat_variant: 'zweiseitig',
    seat_mapping: []
  });
  test_seating.save();

  const test_event1 = new events({
    _id: mongoose.Types.ObjectId('6eb6e7e7e9b7f4194e000001'),
    name: 'test1',
    timestamp: new Date('December 17, 1995 03:24:00'),
    seating: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001'),
    guestlist: [mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001'), mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000002')]
  });

  seatings.updateOne(
    {_id: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001')},
    {$set: {associated_event: mongoose.Types.ObjectId('6eb6e7e7e9b7f4194e000001')}}
  );

  test_event1.save();
});


// function um Testdaten zulöschen

(async function (){
  await events.deleteMany({ _id: mongoose.Types.ObjectId('6eb6e7e7e9b7f4194e000001')}).then(function(){
    console.log("Data deleted!");
  }).catch(function(error){
    console.log(error);
  });
  await guests.deleteMany({ _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000001')}).then(function(){
    console.log("Data deleted!");
  }).catch(function(error){
    console.log(error);
  });
  await guests.deleteMany({ _id: mongoose.Types.ObjectId('4eb6e7e7e9b7f4194e000002')}).then(function(){
    console.log("Data deleted!");
  }).catch(function(error){
    console.log(error);
  });
  await seatings.deleteMany({ _id: mongoose.Types.ObjectId('5eb6e7e7e9b7f4194e000001')}).then(function(){
    console.log("Data deleted!");
  }).catch(function(error){
    console.log(error);
  });
});


app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.sendFile('/client/dist/index.html');
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Example app listening on port ${port}`);
});
