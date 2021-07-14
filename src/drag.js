

export default class Draggables {
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
			newTask.index = this.taskList.indexOf(newTask),
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
			this.createTodoItem(task);
		});
	}
}

