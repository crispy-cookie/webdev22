import { apiEventUrl, apiGuestUrl } from './apiurls.mjs';

async function listGuests () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventId = urlParams.get('event');
  const response = await fetch(apiEventUrl + eventId);
  const data = await response.json();

  const eventName = data.name;
  const container = document.getElementById('gl_main');
  const h1 = document.getElementById('gl_header_h1');
  const h1Text = h1.textContent;
  const newh1Text = h1Text + eventName;
  h1.textContent = newh1Text;
  // container.setAttribute('class', 'uk-align-left');

  const guestIdArray = data.guestlist;
  guestIdArray.forEach(async guestId => {
    const responseGuest = await fetch(apiGuestUrl + guestId);
    const dataGuest = await responseGuest.json();
    const div = document.createElement('div');

    let hasChild;
    if (dataGuest.has_child) {
      hasChild = 'Ja';
    } else {
      hasChild = 'Nein';
    }

    div.textContent = `Name: ${dataGuest.name}, Kinder? ${hasChild},`;
    div.setAttribute('style', 'border:2px solid black;');

    const label = document.createElement('label');
    label.setAttribute('for', 'gl_fuptstatus');
    label.textContent = 'Status: ';
    div.appendChild(label);
    const select = document.createElement('select');
    select.setAttribute('id', 'gl_fuptstatus');
    const option1 = document.createElement('option');
    option1.setAttribute('value', 'unbekannt');
    option1.textContent = 'unbekannt';
    const option2 = document.createElement('option');
    option2.setAttribute('value', 'eingeladen');
    option2.textContent = 'eingeladen';
    const option3 = document.createElement('option');
    option3.setAttribute('value', 'zugesagt');
    option3.textContent = 'zugesagt';
    const option4 = document.createElement('option');
    option4.setAttribute('value', 'abgesagt');
    option4.textContent = 'abgesagt';

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);

    select.value = dataGuest.status;
    div.appendChild(select);

    const updateStatusButton = document.createElement('button');
    updateStatusButton.textContent = 'Status aktualisieren';
    updateStatusButton.setAttribute('id', 'gl_uptstatbutton');

    div.appendChild(updateStatusButton);

    updateStatusButton.addEventListener('click', async event => {
      const selectValue = updateStatusButton.previousSibling.value;
      const newStatus = { status: selectValue };
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus)
      };

      try {
        const response = await fetch(apiGuestUrl + guestId, options);
        const updatedGuest = response.json();
        console.log(updatedGuest);
      } catch (err) {
        console.log(err);
      }
    });

    const deleteGuestbutton = document.createElement('button');
    deleteGuestbutton.textContent = 'Gast Löschen';
    deleteGuestbutton.setAttribute('id', 'gl_delbutton');
    deleteGuestbutton.addEventListener('click', async event => {
      try {
        const responseDelete = await fetch(apiGuestUrl + guestId, { method: 'DELETE' });
        const deleteGuest = await responseDelete.json();
        console.log(deleteGuest);
      } catch (err) {
        console.log(err);
      } finally {
        window.location.reload();
      }
    });

    const br1 = document.createElement('br');
    div.appendChild(deleteGuestbutton);
    container.appendChild(br1);
    container.appendChild(div);
  });
}

async function createGuest () {
  const fname = document.getElementById('gl_fname').value;
  const hasChild = document.getElementById('gl_fhaschild').value;
  const fstatus = document.getElementById('gl_fstatus').value;

  const newGuest = { name: fname, has_child: hasChild, status: fstatus };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newGuest)
  };

  try {
    const response = await fetch(apiGuestUrl, options);
    const newCreatedGuest = await response.json();
    console.log(newCreatedGuest);

    // aktualisieren der Gästeliste beim Event
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eventId = urlParams.get('event');
    const responseEvent = await fetch(apiEventUrl + eventId);
    const getEvent = await responseEvent.json();

    const eventGuestlist = getEvent.guestlist;
    eventGuestlist.push(newCreatedGuest._id);

    const updatedGuestlist = { guestlist: eventGuestlist };
    const optionsPut = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGuestlist)
    };

    const responseUpdatedEvent = await fetch(apiEventUrl + eventId, optionsPut);
    const updatedEvent = responseUpdatedEvent.json();
    console.log(updatedEvent);
  } catch (err) {
    console.log(err);
  } finally {
    window.location.reload();
  }
}

export { listGuests, createGuest };
