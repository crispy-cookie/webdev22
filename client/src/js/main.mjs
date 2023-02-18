import UIkit from 'uikit';
// import Paginate from './paginate.mjs';

import { listEvents } from './listevents.mjs';
import { listGuests } from './guestlist.mjs';
import { listSeating } from './seatinglist.mjs';
import { createNewEvent } from './addevent.mjs';

const bodyListEvent = document.getElementById('bodylistevent');
const bodyGuestList = document.getElementById('bodyguestlist');
const bodySeatingList = document.getElementById('bodyseatinglist');
const buttonAddEvent = document.getElementById('ae_fsubmit');

if (bodyListEvent) {
  bodyListEvent.addEventListener('load', listEvents());
}
if (bodyGuestList) {
  bodyGuestList.addEventListener('load', listGuests());
}
if (bodySeatingList) {
  bodySeatingList.addEventListener('load', listSeating());
}
if (buttonAddEvent) {
  buttonAddEvent.addEventListener('click', async event => { createNewEvent(); });
}

const version = UIkit.version;

console.log(`UIKit Version Number: ${version}`);

// const queryString = window.location.search;
// console.log(queryString);
