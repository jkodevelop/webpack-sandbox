import _ from 'lodash';
import { logMe } from './logMe.cjs';

function component() {
    logMe();
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
}

document.body.appendChild(component());
