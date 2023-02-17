import UIkit from 'uikit';
// import Paginate from './paginate.mjs';

import { listEvents } from './listevents.mjs';
import { listGuests } from './guestlist.mjs';
import { listSeating } from './seatinglist.mjs';

const bodyListEvent = document.getElementById('bodylistevent');
const bodyGuestList = document.getElementById('bodyguestlist');
const bodySeatingList = document.getElementById('bodyseatinglist');

if (bodyListEvent) {
  bodyListEvent.addEventListener('onload', listEvents());
}
if (bodyGuestList) {
  bodyGuestList.addEventListener('onload', listGuests());
}
if (bodySeatingList) {
  bodySeatingList.addEventListener('onload', listSeating());
}

const version = UIkit.version;

console.log(`UIKit Version Number: ${version}`);

const queryString = window.location.search;
console.log(queryString);
