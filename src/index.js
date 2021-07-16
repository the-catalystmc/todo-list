import './style.css';
import Draggables from './drag.js';
import statusCheck from './status.js';


let testList;

class TaskList {
	constructor(taskList) {
		this.taskList = taskList;
	}

	addTaskToArray() {
		const task = document.querySelector('.add-list');

		const newTask = {
			description: task.value,
			completed: false,
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

	clearLocalStorage() {
		localStorage.removeItem('Tasks');
		console.log('working');
	}

	clearTaskList() {
		this.taskList.splice(0, this.taskList.length);
		console.log('Delete')
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
				completed: false,
			}
			this.taskList.push(newTask);
			newTask.index = this.taskList.indexOf(newTask),
				this.createTodoItem(task);
		});

	}

	insertSortTasks(tasks) {
		tasks.forEach((task) => {
			const newTask = {
				description: task.innerText,
				completed: false,
			}
			this.taskList.push(newTask);
			newTask.index = this.taskList.indexOf(newTask);
		});

	}
}

const allTasks = new TaskList([]);
let savedList = allTasks.getFromLocalStorage();

let listTarget = document.getElementById('container');
const listTargetItems = new Draggables(listTarget);

let checkbox = listTarget.getElementsByTagName("input");

const addTaskBtn = document.querySelector('.add-btn');
addTaskBtn.addEventListener('click', () => {
	allTasks.addTaskToArray();
	allTasks.setToLocalStorage();
	allTasks.createTodoItem(allTasks.taskList[allTasks.taskList.length - 1]);
	listTargetItems.updateList();
	checkbox = listTarget.getElementsByTagName("input");
	statusCheck.checkBox(allTasks, checkbox);
})

window.addEventListener('load', () => {
	allTasks.insertTasks(savedList);
	listTargetItems.updateList();
	//   listTargetItems.sortList();
	checkbox = listTarget.getElementsByTagName("input");
	statusCheck.checkBox(allTasks, checkbox);
});
	

const updateList = () => {
	// allTasks.clearLocalStorage();
	testList = Draggables.sortList(listTarget);
	window.localStorage.clear();
	allTasks.clearTaskList();
	allTasks.insertSortTasks(testList);
	allTasks.setToLocalStorage();

listTarget.addEventListener('drop', () => {
updateList()
window.location.reload; })
}