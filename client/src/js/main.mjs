import UIkit from 'uikit';
// import Paginate from './paginate.mjs';

import { getData } from './listevents.mjs';

const body = document.getElementById('bodylist');

body.addEventListener('onload', getData());

const version = UIkit.version;

console.log(`UIKit Version Number: ${version}`);
