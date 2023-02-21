import UIkit from 'uikit';
// import Paginate from './paginate.mjs';

import { listEvents } from './listevents.mjs';
import { listGuests, createGuest } from './guestlist.mjs';
import { listSeating, guestToTable } from './seatinglist.mjs';
import { createNewEvent } from './addevent.mjs';

const bodyListEvent = document.getElementById('bodylistevent');
const bodyGuestList = document.getElementById('bodyguestlist');
const bodySeatingList = document.getElementById('bodyseatinglist');
const buttonAddEvent = document.getElementById('ae_fsubmit');
const buttonAddGuest = document.getElementById('gl_fsubmit');
const buttonGuesToTable = document.getElementById('sl_selectbutton');

if (bodyListEvent) {
  bodyListEvent.addEventListener('load', listEvents(1));
  //bodyListEvent.addEventListener('resize', async event => { listEvents(1); });
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
if (buttonAddGuest) {
  buttonAddGuest.addEventListener('click', async event => { createGuest(); });
}
if (buttonGuesToTable) {
  buttonGuesToTable.addEventListener('click', async event => { guestToTable(); });
}

const version = UIkit.version;

console.log(`UIKit Version Number: ${version}`);

// const queryString = window.location.search;
// console.log(queryString);
