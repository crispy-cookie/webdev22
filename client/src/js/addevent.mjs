
const apiEventUrl = '/events/';
const apiSeatingUrl = '/seatings/';

async function createNewEvent () {
  const eventName = document.getElementById('ae_fname').value;
  const eventDate = document.getElementById('ae_fdate').value;
  const seatingTables = document.getElementById('ae_ftable').value;
  const seatingSeats = document.getElementById('ae_fseats').value;
  const seatingVariant = document.getElementById('ae_fvariant').value;

  console.log(eventName);
  console.log(eventDate);
  console.log(seatingTables);
  console.log(seatingSeats);
  console.log(seatingVariant);

  const newDate = `${eventDate}:00.000Z`;
  console.log(newDate);
  const newEvent = { name: eventName, timestamp: newDate, guestlist: [] };
  const optionsEventPost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEvent)
  };

  // initialisiere leeres Tischmapping
  const initialMapping = {};
  for (let i = 1; i <= seatingTables; i++) {
    const key = i.toString();
    initialMapping[key] = [];
  }

  const newSeating = { count_table: seatingTables, count_seats_per_table: seatingSeats, seat_variant: seatingVariant, seat_mapping: initialMapping };
  const optionsSeatingPost = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSeating)
  };

  try {
    const responseNewEvent = await fetch(apiEventUrl, optionsEventPost);
    const newCreatedEvent = await responseNewEvent.json();
    console.log(newCreatedEvent);

    const responseNewSeating = await fetch(apiSeatingUrl, optionsSeatingPost);
    const newCreatedSeating = await responseNewSeating.json();
    console.log(newCreatedSeating);

    const updateEventSeatingID = { seating: newCreatedSeating._id }; // SeatingID beim Event updaten
    const optionsEventPut = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateEventSeatingID)
    };

    const responseUpdatedEvent = await fetch(apiEventUrl + newCreatedEvent._id, optionsEventPut);
    const updatedEvent = await responseUpdatedEvent.json();
    console.log(updatedEvent);

    const updateSeatingEventID = { associated_event: newCreatedEvent._id }; // Associated Event beim Seating updaten
    const optionsSeatingPut = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateSeatingEventID)
    };

    const responseUpdatedSeating = await fetch(apiSeatingUrl + newCreatedSeating._id, optionsSeatingPut);
    const updatedSeating = await responseUpdatedSeating.json();
    console.log(updatedSeating);
  } catch (err) {
    console.log(err);
  } finally {
    window.location.href = '/listevents';
  }
}

export { createNewEvent };
