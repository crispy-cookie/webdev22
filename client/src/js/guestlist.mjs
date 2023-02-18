const apiUrl = 'http://localhost:8080/events';
const apiGuestUrl = 'http://localhost:8080/guests/';

async function listGuests () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventId = urlParams.get('event');
  const response = await fetch(apiUrl + '/' + eventId);
  const data = await response.json();

  const eventName = data.name;
  const container = document.getElementById('gl_main');
  const h1 = document.getElementById('gl_main_h1');
  const h1Text = h1.textContent;
  const newh1Text = h1Text + eventName;
  h1.textContent = newh1Text;
  // container.setAttribute('class', 'uk-align-left');

  const guestIdArray = data.guestlist;
  guestIdArray.forEach(async element => {
    const responseGuest = await fetch(apiGuestUrl + element);
    const dataGuest = await responseGuest.json();
    const div = document.createElement('div');

    let hasChild;
    if (dataGuest.has_child) {
      hasChild = 'Ja';
    } else {
      hasChild = 'Nein';
    }

    div.textContent = 'Name: ' + dataGuest.name + ', Kinder? ' + hasChild + ', Status: ' + dataGuest.status + '   ';
    div.setAttribute('style', 'border:1px solid black;');
    const button = document.createElement('button');
    button.textContent = 'Löschen';
    button.setAttribute('id', 'gl_button');
    button.setAttribute('class', 'uk-align-right');
    button.addEventListener('click', async event => {
      const responseDelete = await fetch(apiGuestUrl + element, { method: 'DELETE' });
      const deleteGuest = responseDelete.json();
      console.log(deleteGuest);
      window.location.reload();
    });

    const br1 = document.createElement('br');
    div.appendChild(button);
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
  } catch (err) {
    console.log(err);
  } finally {
    window.location.reload();
  }
}

export { listGuests, createGuest };
