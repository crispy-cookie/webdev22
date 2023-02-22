import { apiEventUrl,apiSeatingUrl, apiGuestUrl } from "./apiurls.mjs";

async function listSeating () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventId = urlParams.get('event');
  const response = await fetch(apiEventUrl + eventId);
  const eventData = await response.json();

  const eventName = eventData.name;
  const container = document.getElementById('sl_divmain');
  const h1 = document.getElementById('sl_main_h1');
  const h1Text = h1.textContent;
  const newh1Text = h1Text + eventName;
  h1.textContent = newh1Text;

  const seatingId = eventData.seating;
  // console.log(seatingId);
  const responseSeating = await fetch(apiSeatingUrl + seatingId);
  const seatingData = await responseSeating.json();

  // console.log(seatMapping);

  const divParams = document.getElementById('sl_params');

  divParams.innerText = `Anzahl der Tische: ${seatingData.count_table}, Anzahl der Stühle pro Tisch: ' ${seatingData.count_seats_per_table} ', Bestuhlungsvariante: ${seatingData.seat_variant}`;
  // container.appendChild(divParams);

  // Gäste als optionen
  const selectGuest = document.getElementById('sl_selectguest');
  for (const guestId in eventData.guestlist) {
    const responseGuestData = await fetch(apiGuestUrl + eventData.guestlist[guestId]);
    const guestData = await responseGuestData.json();

    const option = document.createElement('option');
    option.setAttribute('value', guestData._id);
    option.textContent = guestData.name;

    selectGuest.appendChild(option);
  }

  const seatMapping = seatingData.seat_mapping;
  // Tische als optionen
  const selectTable = document.getElementById('sl_selecttable');
  for (const key of Object.keys(seatMapping)) {
    const option = document.createElement('option');
    option.setAttribute('value', key);
    option.textContent = `Tisch ${key}`;

    selectTable.appendChild(option);
  }

  // Tisch besetzung ausgeben
  for (const [key, values] of Object.entries(seatMapping)) {
    // console.log(key + ' ' + values);
    const divTable = document.createElement('div');
    divTable.setAttribute('style', 'white-space: nowrap;');
    divTable.textContent = `Tisch ${key}:`;
    if (values.length !== 0) {
      for (let i = 0; i < values.length; i++) {
        const guestId = values[i].toString();

        const responseGuestData = await fetch(apiGuestUrl + guestId);
        const guestData = await responseGuestData.json();

        const span = document.createElement('span');
        // span.setAttribute('style', 'white-space: nowrap;');
        span.textContent = ` ${guestData.name} `;

        const button = document.createElement('button');
        button.textContent = 'Entfernen';
        button.addEventListener('click', async event => {
          const responseSeating = await fetch(apiSeatingUrl + seatingId);
          const seatingData = await responseSeating.json();

          const seatMapping = await seatingData.seat_mapping;
          console.log(seatMapping);
          const removeIndex = seatMapping[key].indexOf(guestId);
          seatMapping[key].splice(removeIndex, 1);

          const newSeatMapping = { seat_mapping: seatMapping };
          const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSeatMapping)
          };

          try {
            const responseUpdatedSeating = await fetch(apiSeatingUrl + seatingId, options);
            const updatedSeating = await responseUpdatedSeating.json();
            console.log(updatedSeating);
          } catch (err) {
            console.log(err);
          } finally {
            window.location.reload();
          }
        });

        divTable.appendChild(span);
        divTable.appendChild(button);
      }
    }
    container.appendChild(divTable);
  }
}

async function guestToTable () {
  const guestId = document.getElementById('sl_selectguest').value;
  const tableNum = document.getElementById('sl_selecttable').value;

  // const guestName = guestData.name;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventId = urlParams.get('event');
  const responseEvent = await fetch(apiEventUrl + eventId);
  const eventData = await responseEvent.json();

  const seatingId = eventData.seating;

  const responseSeating = await fetch(apiSeatingUrl + seatingId);
  const seatingData = await responseSeating.json();

  const seatMapping = seatingData.seat_mapping;
  const guestPerTable = seatingData.count_seats_per_table;

  for (const key of Object.keys(seatMapping, guestId)) {
    if (key === tableNum) {
      if (seatMapping[key].includes(guestId)) {
        window.alert('Gast sitzt schon an diesem Tisch!!');
      } else if (guestAlreadyMapped(seatMapping, guestId)) {
        window.alert('Gast ist schon einem Platz zugeordnet!');
      } else if (seatMapping[key].length >= guestPerTable) {
        window.alert('Der Tisch ist schon voll!!');
      } else {
        seatMapping[key].push(guestId);
        const newSeatMapping = { seat_mapping: seatMapping };
        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSeatMapping)
        };

        try {
          const responseUpdatedSeating = await fetch(apiSeatingUrl + seatingId, options);
          const updatedSeating = await responseUpdatedSeating.json();
          console.log(updatedSeating);
        } catch (err) {
          console.log(err);
        } finally {
          window.location.reload();
        }
      }
    }
  }
}

function guestAlreadyMapped (seatMapping, guestId) {
  for (const key of Object.keys(seatMapping)) {
    if (seatMapping[key].includes(guestId)) {
      return true;
    }
  }
  return false;
}

export { listSeating, guestToTable };
