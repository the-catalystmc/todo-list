import './style.css';
import Draggables from './drag';
import statusCheck from './status';
import uiUpdate from './updates';

class TaskList {
  refereceList = [];

  container = document.querySelector('.container');

  addTaskBtn = document.querySelector('.add-btn');

  listDraggables = new Draggables(this.container);

  constructor(taskList) {
    this.taskList = taskList;

    this.container.addEventListener('drop', () => {
      this.save();
    });

    this.addTaskBtn.addEventListener('click', () => {
      this.createTodoItem({
        description: document.querySelector('.add-list').value,
        completed: false,
      });
      this.listDraggables.updateList();
      this.save();
      document.querySelector('.add-list').value = '';
    });
  }

  save = () => {
    const container = document.querySelector('.container');
    const allElements = container.getElementsByTagName('li');

    this.clearTaskList();

    Array.from(allElements).forEach((element, i) => {
      const newTask = {
        description: element.querySelector('.task-desc').innerText,
        completed: element.querySelector('.check-item').checked,
        index: i,
      };
      this.taskList.push(newTask);
      this.setToLocalStorage();
    });
  }

  addTaskToArray() {
    const task = document.querySelector('.add-list');

    const newTask = {
      description: task.value,
      completed: false,
    };
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
    return this;
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

    statusCheck.setChecked(clone, task.completed);

    clone.querySelector('.check-item').addEventListener('change', () => {
      this.save();
      window.location.reload();
    });
    uiUpdate.removeTask(clone, this);
    uiUpdate.editInput(clone, this);
    uiUpdate.clearChecked(clone, task, this);
  }

  insertTasks(tasks) {
    tasks.forEach((task) => {
      const newTask = {
        description: task.description,
        completed: task.completed,
      };
      this.taskList.push(newTask);
      newTask.index = this.taskList.indexOf(newTask);
      this.createTodoItem(newTask);
    });
  }

  static exportTaskList() {
    return this.taskList;
  }
}

const allTasks = new TaskList([]);
const savedList = allTasks.getFromLocalStorage();

const listTarget = document.getElementById('container');
const listTargetItems = new Draggables(listTarget);

window.addEventListener('load', () => {
  allTasks.insertTasks(savedList);
  listTargetItems.updateList();
});

export { allTasks as default };