const apiUrl = 'http://localhost:8080/events';
const apiSeatingUrl = 'http://localhost:8080/seatings/';

async function listSeating () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventId = urlParams.get('event');
  const response = await fetch(apiUrl + '/' + eventId);
  const data = await response.json();

  const eventName = data.name;
  const container = document.getElementById('sl_main');
  const h1 = document.getElementById('sl_main_h1');
  const h1Text = h1.textContent;
  const newh1Text = h1Text + eventName;
  h1.textContent = newh1Text;

  const seatingId = data.seating;
  // console.log(seatingId);
  const responseSeating = await fetch(apiSeatingUrl + seatingId);
  const seatingData = await responseSeating.json();

  const seatMapping = seatingData.seat_mapping;
  // console.log(seatMapping);

  for (const [key, values] of Object.entries(seatMapping)) {
    // console.log(key + ' ' + values);
    for (const value of values) {
      const div = document.createElement('div');
      div.textContent = 'Tisch: ' + key + ' Gast: ' + value.toString();
      container.appendChild(div);
    }
  }
}

export { listSeating };
