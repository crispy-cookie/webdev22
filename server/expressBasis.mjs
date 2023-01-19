import express from 'express';

const PORT = 8080;
const BASE_URI = `http://localhost:${PORT}`;
console.log(BASE_URI);

const server = express();

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

// Hilfsfunktion
function getDatabase (id) {
  return 'test';
}

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Example app listening on port ${port}`);
});


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
server.get('/events', (req, resp) => {
  res.send('bla');
});

// LV
server.post('/events', (req, resp) => {
  res.send('bla');
});

// Veranstaltungen
server.get('/events/:id', (req, resp) => {
  res.send('bla');
});

/* // put soll fuer Veranstaltungen nicht unterstuetzt werden
// V
server.put('/event/:id', (req, resp) => {
  res.send('bla');
});
*/

// V
server.delete('/event/:id', (req, resp) => {
  res.send('bla');
});


/*
** Gaeste
*/


// ListeGaeste
server.get('/guests', (req, resp) => {
  res.send('bla');
});

// ListeGaeste
server.post('/guests', (req, resp) => {
  res.send('bla');
});

// Gaeste
server.get('/guests/:id', (req, resp) => {
  res.send('bla');
});

// Gaeste
server.put('/guests/:id', (req, resp) => {
  res.send('bla');
});

// Gaeste
server.delete('/guests/:id', (req, resp) => {
  res.send('bla');
});


/*
** Tische / Sitze Planung
*/

// ListePlanung
server.get('/seating', (req, resp) => {
  res.send('bla');
});

// ListePlanung
server.post('/seating', (req, resp) => {
  res.send('bla');
});

// Planung
server.get('/table/:id', (req, resp) => {
  res.send('bla');
});

/* // Planung soll nicht unterstuetzt werden
server.put('/table/:id', (req, resp) => {
  res.send('bla');
});
*/

// Planung
server.delete('/table/:id', (req, resp) => {
  res.send('bla');
});
