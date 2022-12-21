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

function getDatabase (id) {
  return 'test';
}
