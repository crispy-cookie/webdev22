import { calculateObjectSize } from 'bson';
import express, { response } from 'express';
import {events, guests, seatings} from './mongooseBasis.mjs';
import bodyParser from 'body-parser';

const PORT = 8080;
const BASE_URI = `http://localhost:${PORT}`;
console.log(BASE_URI);

const server = express();
server.use(bodyParser.json());
/* Beispiel fuer unten; TODO: muss ich noch anpassen
server.get('/veranstaltungen/list/:id', (request, response) => {
  const id = request.params.id;
  const dbList = getDatabase(id);
  response.send('bla');
});

/*
server.post(`${BASE_URI}/veranstaltungen/list/${id}`, (request, response) => {
  const newVeranstaltung = request.body;
  if (!(newVeranstaltung)) {
    response.sendStatus(404); // Fehlerbehandlung zu body und zu fehlenden Parametern fuer Datenbank-document
  } else { // lege neues DB-Document an
    writeToDatabase(newVeranstaltung, callback);
    // AUS BEISPIEL: const id = Customers.create(newCustomer.name, newCustomer.email, newCustomer.address.country, newCustomer.address.postalcode, newCustomer.address.city, newCustomer.address.line1, newCustomer.address.line2, newCustomer.address.line3);
    response.location(`${BASE_URI}/customers/${id}`).status(201).json(createCustomerBody(id));
  }
});
*/

/* ############
** #
** # Routen
** #
** ############
** TODO: vlt auslagern
**
** get > lesen, post > anlegen, put > bearbeiten, delete > loeschen
*/

/*
** Veranstaltungen
*/

// Liste der Veranstaltungen
server.get('/events', async (req, res) => {
  try{
   
    const events_all = await events.find()
    res.json(events_all);
  }
  catch(err){
    console.log(err);
  }
});

// LV
server.post('/events', async (req, res) => {
  const new_event = new events({
    name: req.body.name,
    timestamp: req.body.timestamp,
    seating: req.body.seating,                
    guestlist: req.body.guestlist
  });

  try{
    const save_new_event= await new_event.save();
    res.json(save_new_event);
  }catch(err){
    console.log(err);
  }
});

// Veranstaltungen
server.get('/events/:id', async (req, res) => {
  try{
    const event = await events.findById(req.params.id);
    res.json(event);
  }catch(err){
    console.log(err);
  }
});

// put soll fuer Veranstaltungen nicht unterstuetzt werden <-> Überlegung über put die Gästeliste aktualisieren lassen
// V
server.put('/events/:id', async (req, res) => {
    if(!events.exists({_id: req.params.id})){
      response.sendStatus(404);
    }else{
      let updateEvent = await events.updateOne(
        {_id: req.params.id},
        {$set: {guestlist: req.body.guestlist}}
      );
      res.json(updateEvent);
    }
});


// V
server.delete('/events/:id', async (req, res) => {
  try{

    const removedEvent = await events.deleteOne({_id: req.params.id});
    res.json(removedEvent);
  
  }catch(err){
    console.log(err);
  }
});


/*
** Gaeste
*/


// ListeGaeste
server.get('/guests', async(req, res) => {
  try{
   
    const guests_all = await guests.find()
    res.json(guests_all);
  }
  catch(err){
    console.log(err);
  }
});

// ListeGaeste
server.post('/guests', async (req, res) => {
  const new_guest = new guests({
    name: req.body.name,
    has_child: req.body.has_child,
    status: req.body.status
  });

  try{
    const save_new_guest= await new_guest.save();
    res.json(save_new_guest);
  }catch(err){
    console.log(err);
  }
});

// Gaeste
server.get('/guests/:id', async (req, res) => {
  try{
    const guest = await guests.findById(req.params.id);
    res.json(guest);
  }catch(err){
    console.log(err);
  }
});

// Gaeste, nur der Einladestatus kann verändert werden 
server.put('/guests/:id', async (req, res) => {
  if(!guests.exists({_id: req.params.id})){
    response.sendStatus(404);
  }else{
    try {
      let updateGuest = await guests.updateOne(
        { _id: req.params.id },
        { $set: { status: req.body.status } },
        { runValidators: true }
      );
      res.json(updateGuest);
    } catch (err) {
      console.log(err);
    }
  }
});

// Gaeste
server.delete('/guests/:id', async (req, res) => {
  try{

    const removedGuest = await guests.deleteOne({_id: req.params.id});
    await events.updateMany({guestlist: req.params.id},{'$pull':{guestlist: req.params.id}}); // entfernt die guest_id in jedem Event, dass diese in der Gästeliste hat
    //TODO sitzplanung entfernen aus seat_mapping
    res.json(removedGuest);
  
  }catch(err){
    console.log(err);
  }
});


/*
** Tische / Sitze Planung
*/

// Alle Sitzpläne
server.get('/seatings', async (req, res) => {
  try{
   
    const seating_all = await seatings.find()
    res.json(seating_all);
  }
  catch(err){
    console.log(err);
  }
});

// 
server.post('/seatings', async (req, res) => {
  const new_seating = new seatings({
    associated_event: req.body.associated_event,
    count_table: req.body.count_table,
    count_seats_per_table: req.body.count_seats_per_table,
    seat_variant: req.body.seat_variant,
    seat_mapping: req.body.seat_mapping
  });

  try{
    const save_new_seating= await new_seating.save();
    res.json(save_new_seating);
  }catch(err){
    console.log(err);
  }
});

//Einzelner Sitzplan
server.get('/seatings/:id', async (req, res) => {
  try{
    const seating = await seatings.findById(req.params.id);
    res.json(seating);
  }catch(err){
    console.log(err);
  }
});

// Sitzplan, nur die Zuordnung der Tische kann verändert werden
server.put('/seatings/:id', async (req, res) => {
  if(!seatings.exists({_id: req.params.id})){
    response.sendStatus(404);
  }else{
    try {
      let updateSeating = await seatings.updateOne(
        { _id: req.params.id },
        { $set: { seat_mapping: req.body.seat_mapping } } // TODO: Vor dieser Zuordnung muss noch eine Überprüfung stattfinden ob die Anzahl der Keys zu der Anzahl
                                                          // der Tische passt, sowie jeweils pro Tisch die Anzahl der Sitzplätze zu den Values passt
      );
      res.json(updateSeating);
    } catch (err) {
      console.log(err);
    }
  }
});

// Sitzplan
/* delete beim Sitzplan unsinnig Sitzplan wird vollständig entfernt wenn Veranstaltung nicht mehr vorhanden
server.delete('/seatings/:id', async (req, res) => {
  try{

    const removedSeating = await seatings.deleteOne({_id: req.params.id});
    await events.updateOne({seating: req.params.id},{ $unset:{seating: req.params.id}}); // Beim entfernen des Sitzplans, soll die Referenz bei der Veranstaltung auch entfernt werden
    res.json(removedSeating);
  
  }catch(err){
    console.log(err);
  }
});
*/
/*
// Planung
server.get('/table/:id', (req, res) => {
  res.send('bla');
});

 // Planung soll nicht unterstuetzt werden
server.put('/table/:id', (req, resp) => {
  res.send('bla');
});


// Planung
server.delete('/table/:id', (req, res) => {
  res.send('bla');
});
*/

export{server};