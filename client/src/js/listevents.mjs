import { apiEventUrl,apiSeatingUrl } from "./apiurls.mjs";
const elementHeight = 210; // Hoehe eines einzelnen Elements

async function goFetch (apiEventUrl) {
  const response = await fetch(apiEventUrl);
  const data = await response.json();
  return data;
}

async function listEvents (page) {
  const paginationContainer = document.getElementById('bodylistevent');

  const items = await goFetch(apiEventUrl);
  // console.log(items);
  const itemsPerPage = await calcAnzItems();

  const start = (page - 1) * itemsPerPage;
  const ende = start + itemsPerPage;

  const paginatedItems = items.slice(start, ende);

  // console.log('paginatedItems', paginatedItems)

  const paginationButtons = await createNavBtn(items);
  // pagination zahlen aktualisieren
  if (paginationContainer.lastChild) {
    paginationContainer.removeChild(paginationContainer.lastElementChild);
  }
  paginationContainer.appendChild(paginationButtons);

  await renderItems(paginatedItems);
}

async function calcAnzItems () {
  const anz = Math.floor(window.innerHeight / elementHeight);
  if (anz < 1) {
    return 1;
  } else {
    return anz;
  }
}

async function createNavBtn (items) {
  const itemsPerPage = await calcAnzItems();
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginationButtons = document.createElement('ul');
  paginationButtons.setAttribute('class', 'uk-pagination uk-text-bold');

  // Jede Seite navigierbar machen
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const button = document.createElement('a');
    button.setAttribute('href', `#${i}`);
    li.appendChild(button);
    button.innerText = `< ${i} > `;
    button.addEventListener('click', async () => {
      const paginatedItems = listEvents(i); // durch calcSize ersetzen
      await renderItems(paginatedItems);
    });
    paginationButtons.appendChild(button);
  }
  return paginationButtons;
}

async function renderItems (items) {
  const itemsContainer = document.getElementById('le_main_h1'); // >> html
  itemsContainer.innerHTML = ''; // leeren bei Aktualisierung

  const span = document.createElement('span');
  span.setAttribute('class', 'uk-text-background uk-text-large');
  span.textContent = 'Liste der Veranstaltungen';

  itemsContainer.appendChild(span);
  itemsContainer.appendChild(document.createElement('br'));

  console.log('myItems:', items);
  let count = 0;

  const arr = Array.from(items);

  arr.forEach(async element => {
    // while (await calcSizeBool) {
    console.info('element', element);
    const div = document.createElement('div');
    div.setAttribute('style', 'border:1px solid black;');
    const para1 = document.createElement('p');
    para1.setAttribute('class', 'uk-text-small uk-text-left uk-text-bold uk-text-primary');
    para1.innerText = `Name der Veranstaltung: ${element.name}`;

    const paraDate = document.createElement('p');
    paraDate.setAttribute('class', 'uk-text-small uk-text-left uk-text-primary');
    paraDate.innerText = `Datum: ${new Date(element.timestamp).toLocaleString()}`;

    const para2 = document.createElement('p');
    para2.setAttribute('class', 'uk-text-small uk-text-left');
    para2.textContent = 'Sitzplan: ';
    const seatingLink = document.createElement('a');
    seatingLink.setAttribute('href', `/seatinglist?event=${element._id}`);
    seatingLink.textContent = '>Klick mich fürs bearbeiten<';
    para2.appendChild(seatingLink);

    const para3 = document.createElement('span');
    para3.textContent = ' || Gästeliste: ';
    const guestlistLink = document.createElement('a');
    guestlistLink.setAttribute('href', `/guestlist?event=${element._id}`);
    guestlistLink.textContent = '>Klick mich fürs bearbeiten<';
    para3.appendChild(guestlistLink);
    para2.appendChild(para3);
    // para2.appendChild(para3);

    const button = document.createElement('button');
    button.textContent = 'Löschen';
    button.setAttribute('id', 'le_button');
    button.setAttribute('class', 'uk-text-left');
    button.addEventListener('click', async event => {
      const responseDeleteEvent = await fetch(apiEventUrl + element._id, { method: 'DELETE' });
      const deleteEvent = await responseDeleteEvent.json();
      console.log(deleteEvent);

      const responseDeleteSeating = await fetch(apiSeatingUrl + element.seating, { method: 'DELETE' });
      const deleteSeating = await responseDeleteSeating.json();
      console.log(deleteSeating);

      window.location.reload();
    });
    // }
    div.appendChild(para1);
    div.appendChild(paraDate);
    div.appendChild(para2);
    // div.appendChild(para3);
    div.appendChild(button);
    itemsContainer.appendChild(div);
    if (count < arr.length - 1) {
      itemsContainer.appendChild(document.createElement('br'));
    }
    count++;
  });
}

export { listEvents };
