import './style.css';
import Draggables from './drag.js';

const allTasks= new Draggables([]);
const savedList = allTasks.getFromLocalStorage();

const addTaskBtn = document.querySelector('.add-btn');
 addTaskBtn.addEventListener('click', () => {
  allTasks.addTaskToArray();
  allTasks.setToLocalStorage();
  allTasks.createTodoItem(allTasks.taskList[allTasks.taskList.length - 1]);
 })

window.addEventListener('load', () => {
	allTasks.insertTasks(savedList);
});

// import './status.js';


// export const taskData = [
//   {
//     description: 'wash the dishes',
//     completed: false,
//     index: 0,
//   },
//   {
//     description: 'write javascript code',
//     completed: false,
//     index: 1,
//   },
//   {
//     description: 'login to moodle',
//     completed: false,
//     index: 3,
//   },
// ];

// const taskCont = document.querySelector('.container');
// const taskItem = document.querySelector('.list-template');

// const createTodoItem = (todoList) => {
//   const clone = taskItem.content.firstElementChild.cloneNode(true);
//   clone.querySelector('.task-desc').innerText = todoList.description;

//   taskCont.appendChild(clone);
// };

// const todoSetup = () => {
//   taskData.forEach((task) => {
//     createTodoItem(task);
//   });
// };

// window.addEventListener('load', () => {
//   todoSetup();
// });