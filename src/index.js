import './style.css';
import Draggables from './drag.js';

class TaskList {
	constructor(taskList) {
		this.taskList = taskList;
	}

	addTaskToArray() {
		const task = document.querySelector('.add-list');

		const newTask = {
			description: task.value,
			completed: null,
		}
		this.taskList.push(newTask);
		newTask.index = this.taskList.indexOf(newTask);
			task.value = '';
	}

	setToLocalStorage() {
		localStorage.setItem('Tasks', JSON.stringify(this.taskList));
	}

	getFromLocalStorage() {
		const tasks = localStorage.getItem('Tasks');
		if (tasks != null) {
			return JSON.parse(tasks);
		}
		return this.taskList;
	}

	createTodoItem(taskList) {
		const taskCont = document.querySelector('.container');
		const taskItem = document.querySelector('.list-template');

		const clone = taskItem.content.firstElementChild.cloneNode(true);
		clone.querySelector('.task-desc').innerText = taskList.description;

		taskCont.appendChild(clone);
	};

	insertTasks(tasks) {
		tasks.forEach((task) => {
			const newTask = {
				description: task.description,
			}
			this.taskList.push(newTask);
			newTask.index = this.taskList.indexOf(newTask),
				this.createTodoItem(task);
		});
	}
}



const allTasks= new TaskList([]);
const savedList = allTasks.getFromLocalStorage();

let listTarget = document.getElementById('container');
const listTargetItems = new Draggables(listTarget);


const addTaskBtn = document.querySelector('.add-btn');
 addTaskBtn.addEventListener('click', () => {
  allTasks.addTaskToArray();
  allTasks.setToLocalStorage();
  allTasks.createTodoItem(allTasks.taskList[allTasks.taskList.length - 1]);
 })

window.addEventListener('load', () => {
	allTasks.insertTasks(savedList);
  listTargetItems.updateList();
});

let items = listTarget.getElementsByTagName("li");
listTarget.addEventListener('drop', () => {
	console.log(items);

// items.forEach((element, index) => {
// 	console.log(element);
// 	console.log('Hello')
// });
})