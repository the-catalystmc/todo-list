import { get } from 'lodash';
import Draggables from './drag.js';
import TaskList from './index.js';

class StatusCheck {

  container = document.querySelector('.container');
  allElements = this.container.getElementsByTagName('li');

  setChecked = (clone, stat) => {
    clone.querySelector('.check-item').checked = stat;
  }

  getIndex = (element) => {
    console.log((Array.from(this.allElements).indexOf(element)));
  }
}

const statusCheck = new StatusCheck()
export { statusCheck as default };