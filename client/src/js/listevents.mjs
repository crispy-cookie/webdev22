const apiEventUrl = '/events/';
const apiSeatingUrl = '/seatings/';

async function listEvents () {
  const response = await fetch(apiEventUrl);
  const container = document.getElementById('le_main_h1');
  const data = await response.json();
  console.log(data);
  data.forEach(element => {
    const div = document.createElement('div');
    const para1 = document.createElement('p');
    para1.setAttribute('class', 'uk-text-small');
    para1.innerText = `Name der Veranstaltung ${element.name} Datum: ${new Date(element.timestamp).toLocaleString()}`;

    const para2 = document.createElement('p');
    para2.setAttribute('class', 'uk-text-small');
    const seatingLink = document.createElement('a');
    seatingLink.setAttribute('href', `/seatinglist?event=${element._id}`); // Platzhalter-Link
    seatingLink.textContent = `Sitzplan ${element.seating}`;
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

    div.appendChild(para1);
    div.appendChild(para2);
    div.appendChild(para3);
    div.appendChild(button);
    container.appendChild(div);
  });
}

export { listEvents };
