import _ from 'lodash';

export default function printMe() {
  console.log(_.join(['Print', 'Me.'], ' '));
  console.log('I get called from printMe()!');
}