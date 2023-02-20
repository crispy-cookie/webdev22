const apiEventUrl = '/events/';
const apiSeatingUrl = '/seatings/';

async function goFetch (apiEventUrl) {
  const response = await fetch(apiEventUrl);
  const data = await response.json();
  return data;
}

/*
async function calcSize (items, container) {
  const windowHeight = window.innerHeight;
  const containerHeight = Math.max(container.offsetHeight, 1);
  const entryHeight = container.firstElementChild.offsetHeight ? container.firstElementChild.offsetHeight : 10;
  const entries = data.length;

  console.log('windowHeight', windowHeight);
  console.log('containerHeight', containerHeight);
  console.log('entryHeight', entryHeight);

  // entriesOnPage = Math.max(Math.floor(windowHeight / entryHeight)); // gibt entriesPerPage zurueck
  return  Math.max(Math.floor(windowHeight / entryHeight)); // gibt entriesPerPage zurueck
}

async function calcSizeBool(argument) {
  const windowHeight = window.innerHeight;
  const containerHeight = Math.max(container.offsetHeight, 1);
  
  if (containerHeight + 10 > windowHeight) {
    return true;
  } else {
    return false;
  }
}

while (calcSizeBool) {
  addItems zu render
}
*/

async function listEvents (page) {
  
  const paginationContainer = document.getElementById('bodylistevent');

  const items = await goFetch(apiEventUrl);
  console.log(items);
  const itemsPerPage = 5;

  const start = (page - 1) * itemsPerPage;
  console.log('start', start);
  const ende = start + itemsPerPage;
  console.log('ende', ende);
  const paginatedItems = items.slice(start, ende);

  console.log('paginatedItems', paginatedItems)

  const paginationButtons = await createNavBtn(items);
  console.log('pagnationButton angelegt', paginationButtons);
  paginationContainer.appendChild(paginationButtons);
  console.log('paginationContainer Inhalt', paginationContainer);

  /*const test = document.createElement('p');
  test.textContent = 'blabla';
  paginationContainer.appendChild(test);*/
  
  await renderItems(paginatedItems);
}

/*async function listEvents () { // ANFANG
  // Initialisierung der Pagination

  const paginationContainer = document.getElementById('le_main_h1');

  const items = await goFetch(apiEventUrl);
  const paginatedItems = items.slice(0, 5);

  const paginationButtons = await createNavBtn(items);
  paginationContainer.appendChild(paginationButtons);
  
  await renderItems(paginatedItems);
}

async function resizedListEvents (currentPage) { // ANFANG
  const paginationContainer = document.getElementById('le_main_h1');
  const paginationButtons = createNavBtn(items);
  paginationContainer.appendChild(paginationButtons);

  const itemsPerPage = await calcSize()
  const start = (currentPage -1) * itemsPerPage;
  const items = await goFetch(apiEventUrl);
  
  const paginatedItems = items.slice((currentPage -1) * itemsPerPage, start + itemsPerPage);
  await renderItems(paginatedItems);
}
*/

async function createNavBtn (items) {
  const itemsPerPage = 5; // fixed value bei init
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginationButtons = document.createElement('div');

  // Jede Seite navigierbar machen
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.addEventListener('click', async () => {
      const paginatedItems = listEvents(i); // durch calcSize ersetzen
      await renderItems(paginatedItems);
    });
    paginationButtons.appendChild(button);
  }
  console.log('here is nav');
  return paginationButtons;
}

async function renderItems (items) {
  const itemsContainer = document.getElementById('le_main_h1'); // >> html
    itemsContainer.innerHTML = ''; // leeren bei Aktualisierung

    console.log('myItems:', items);
    items.forEach(element => {
      // while (await calcSizeBool) {
        console.info('element', element);
        const div = document.createElement('div');
        const para1 = document.createElement('p');
        para1.setAttribute('class', 'uk-text-small');
        para1.innerText = `Name der Veranstaltung: ${element.name} Datum: ${new Date(element.timestamp).toLocaleString()}`;

        const para2 = document.createElement('p');
        para2.setAttribute('class', 'uk-text-small');
        const seatingLink = document.createElement('a');
        seatingLink.setAttribute('href', `/seatinglist?event=${element._id}`); // Platzhalter-Link
        seatingLink.textContent = 'Sitzplan: ' + element.seating;
        para2.appendChild(seatingLink);

        const para3 = document.createElement('p');
        para3.setAttribute('class', 'uk-text-small');
        const guestlistLink = document.createElement('a');
        guestlistLink.setAttribute('href', `/guestlist?event=${element._id}`); // Platzhalter-Link
        guestlistLink.textContent = 'Gästeliste: ';
        para3.appendChild(guestlistLink);

        const button = document.createElement('button');
        button.textContent = 'Löschen';
        button.setAttribute('id', 'le_button');
        button.setAttribute('class', 'uk-align-center');
        button.addEventListener('click', async event => {
          const responseDeleteEvent = await fetch(apiEventUrl + element._id, { method: 'DELETE' });
          const deleteEvent = await responseDeleteEvent.json();
          console.log(deleteEvent);

          const responseDeleteSeating = await fetch(apiSeatingUrl + element.seating, { method: 'DELETE' });
          const deleteSeating = await responseDeleteSeating.json();
          console.log(deleteSeating);

          window.location.reload();
        });
      //}
    div.appendChild(para1);
    div.appendChild(para2);
    div.appendChild(para3);
    div.appendChild(button);
    itemsContainer.appendChild(div);
    });
}


export { listEvents };
