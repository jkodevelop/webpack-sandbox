import _ from 'lodash';
import { logMe } from './logMe.cjs';

import './style.css';
import './altStyle.scss';

import Icon from './assets/icon.png';

import printMe from './print.js';

import xmlExample from './others/example.xml';
import csvExample from './others/example.csv';
import jsonExample from './others/example.json';

import yamlExample from './others/example.yaml';

function component() {
  logMe();
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  element.classList.add('another');

  const iconImg = new Image();
  iconImg.src = Icon;
  element.appendChild(iconImg);

  console.log(xmlExample);
  console.log(csvExample);
  console.log(jsonExample);

  console.log(yamlExample);

  printMe();

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./logMe.cjs', function() {
    console.log('accepting updated logMe module.');
    logMe();
  });
}
