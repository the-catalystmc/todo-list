import './style.css';
import Draggables from './drag.js';
import statusCheck from './status.js';

let testList;
let testListB;
let boxChecked;



export default class TaskList {

	refereceList = [];
	container = document.querySelector('.container');
	addTaskBtn = document.querySelector('.add-btn');

	listDraggables = new Draggables(this.container);

	constructor(taskList) {
		this.taskList = taskList;

		this.container.addEventListener('drop', () => {
			updateList();
			window.location.reload;
			this.save();
			console.log('drop')
		})

		this.addTaskBtn.addEventListener('click', () => {
			this.createTodoItem({
				description: document.querySelector('.add-list').value,
				completed: false});
			this.listDraggables.updateList();
			this.save();
		})
	}

	save = () => {
		const container = document.querySelector('.container');
  	const allElements = container.getElementsByTagName('li');

		this.clearTaskList();

		console.log("helo save")
		Array.from(allElements).forEach((element, i) => {
			const newTask = {
				description: element.querySelector('.task-desc').innerText,
				completed: element.querySelector('.check-item').checked,
				index: i,
			}
			this.taskList.push(newTask);
			this.setToLocalStorage();
		}); 

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
	}

	createTodoItem(task) {
		const taskCont = document.querySelector('.container');
		const taskItem = document.querySelector('.list-template');



		const clone = taskItem.content.firstElementChild.cloneNode(true);
		clone.querySelector('.task-desc').innerText = task.description;


		this.refereceList.push(clone);
		taskCont.appendChild(clone);

		console.log(task.completed)
		statusCheck.setChecked(clone, task.completed);

		clone.querySelector('.check-item').addEventListener('change', (e) => {
			statusCheck.checkStats(clone);
			this.save();
		});
	};

	insertTasks(tasks) {
		tasks.forEach((task) => {
			const newTask = {
				description: task.description,
				completed: task.completed,
			}
			this.taskList.push(newTask);
			newTask.index = this.taskList.indexOf(newTask),
				this.createTodoItem(newTask);
		});

	}

	static exportTaskList() {
		return this.taskList;
	}
}

const allTasks = new TaskList([]);
let savedList = allTasks.getFromLocalStorage();

let listTarget = document.getElementById('container');
const listTargetItems = new Draggables(listTarget);

window.addEventListener('load', () => {
	allTasks.insertTasks(savedList);
	listTargetItems.updateList();
});
