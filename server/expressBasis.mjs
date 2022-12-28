import express from 'express';

const PORT = 8080;
const BASE_URI = `http://localhost:${PORT}`;
console.log(BASE_URI);

const server = express();

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
** todo: vlt auslagern
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


// LG
server.get('/guests', (req, resp) => {
  res.send('bla');
});

// LG
server.post('/guests', (req, resp) => {
  res.send('bla');
});

// G
server.get('/guests/:id', (req, resp) => {
  res.send('bla');
});

// G
server.put('/guests/:id', (req, resp) => {
  res.send('bla');
});

// G
server.delete('/guests/:id', (req, resp) => {
  res.send('bla');
});


/*
** Tische / Sitze Planung
*/

// LP
server.get('/seating', (req, resp) => {
  res.send('bla');
});

// LP
server.post('/seating', (req, resp) => {
  res.send('bla');
});

// P
server.get('/table/:id', (req, resp) => {
  res.send('bla');
});

// P
server.put('/table/:id', (req, resp) => {
  res.send('bla');
});

// P
server.delete('/table/:id', (req, resp) => {
  res.send('bla');
});
