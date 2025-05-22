import _ from 'lodash';
import { logMe } from './logMe.cjs';

import './style.css';
import './altStyle.scss';

function component() {
    logMe();
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    element.classList.add('another');
    return element;
}

document.body.appendChild(component());
