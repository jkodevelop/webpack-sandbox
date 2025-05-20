import _ from 'lodash';
import { logMe } from './logMe.cjs';

import './style.css';

function component() {
    logMe();
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    return element;
}

document.body.appendChild(component());
