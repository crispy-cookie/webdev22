'use strict';
import path from 'path';
import express from 'express';
import { initializeDatabase } from './server/mongooseBasis.mjs';
import { server } from './server/expressBasis.mjs';
import { events} from './server/mongooseBasis.mjs';

const app = express();
const port = parseInt(process.argv[2]) ? parseInt(process.argv[2]) : '8080';
const staticPath = path.join(path.dirname(process.argv[1]), path.join('client', 'dist')); // Pfad aendern falls /index.mjs zu /server/expressBasis.js wird -> '../client/dist/'

app.use(express.static(staticPath));
app.use(server);

initializeDatabase();

//test-Veranstaltung DummyDaten
(async function () {

  const test_event1 = new events({
    name: 'test1',
    timestamp: new Date('December 17, 1995 03:24:00'),
    guestlist: [1, 2, 3]
  });
  const test_event2 = new events({
    name: 'test2',
    timestamp: new Date('December 18, 2021 03:24:00'),
    guestlist: [1, 2, 3,5,8]
  });

  test_event1.save();
  test_event2.save();
});


// function um Testdaten zulöschen

(async function (){
  await events.deleteMany({ name: 'test1'}).then(function(){
    console.log("Data deleted!");
  }).catch(function(error){
    console.log(error);
  });
  await events.deleteMany({ name: 'test2'}).then(function(){
    console.log("Data deleted!");
  }).catch(function(error){
    console.log(error);
  });
})();


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
