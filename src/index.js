import _ from 'lodash';
import { logMe } from './logMe.cjs';

import './style.css';
import './altStyle.scss';

import Icon from './assets/icon.png';

function component() {
    logMe();
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    element.classList.add('another');

    const iconImg = new Image();
    iconImg.src = Icon;
    element.appendChild(iconImg);

    return element;
}

document.body.appendChild(component());
