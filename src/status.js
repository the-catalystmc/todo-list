import Draggables from './drag.js';
import TaskList from './index.js';

export default class statusCheck {
  static checkBox(arr, checkbox) {
    const arrStorage = arr;
    arr = arr.taskList;
    let current = null;
    let currentIndex = null;
    checkbox = [...checkbox];
    for (let item of checkbox) {
      item.addEventListener('change', (e) => {
        current = e.target;
        currentIndex = checkbox.indexOf(e.target);

        if (current.checked) {
          current.parentNode.classList.add('done');
          arr.forEach((element, index) => {
            if (index === currentIndex) {
              element.completed = true;
              console.log(element);
            }
          });
        }
        else {
          current.parentNode.classList.remove('done')
          arr.forEach((element, index) => {
            if (index === checkbox.indexOf(current)) {
              element.completed = false;
            }
          });
        }

      })
    }
return arr;
  }
}

// export default class statusCheck {
//   static checkBox(list, checkbox) {
//     let allTasks = TaskList.exportTaskList();
//     let current = null;
//     let currentIndex = null;
//     let savedList = list.getFromLocalStorage();
//     checkbox = [...checkbox];
//     for (let item of checkbox) {
//       item.addEventListener('change', (e) => {
//         current = e.target;
//         // currentIndex = checkbox.indexOf(e.target);
//         if (current.checked) {
//           current.parentNode.classList.add('done')
//           savedList.forEach((element, index) => {
//             if (index == checkbox.indexOf(current)) {
//               element.completed = true;
//             }
//           });
//         }
//         else {
//           current.parentNode.classList.remove('done')
//           savedList.forEach((element, index) => {
//             if (index == checkbox.indexOf(current)) {
//               element.completed = false;
//             }
//           });
//         }


//       })

//     }
//     return checkbox;
//   }
// }