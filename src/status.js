import Draggables from './drag.js';

export default class statusCheck {
  static checkBox(list, checkbox){
    let current = null;
    let currentIndex = null;
    let savedList = list.getFromLocalStorage();
    checkbox = [...checkbox];
    for (let item of checkbox) {
      item.addEventListener('change', (e) => {
        current = e.target;
        // currentIndex = checkbox.indexOf(e.target);
        if (current.checked) {
          current.parentNode.classList.add('done')
          savedList.forEach((element, index) => {
            if (index == checkbox.indexOf(current)) {
              console.log('yes')
              element.completed = true;
              console.log(element);
            }
          });
        }
        else {
          current.parentNode.classList.remove('done')
          savedList.forEach((element, index) => {
            if (index == checkbox.indexOf(current)) {
              console.log('yes')
              element.completed = false;
              console.log(element);
            }
          });
        }
  
  
      })
  
    }
  }
}