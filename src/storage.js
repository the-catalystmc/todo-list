class Storage {
  setToLocalStorage(data) {
		localStorage.setItem('Tasks', JSON.stringify(data));
	}

  getFromLocalStorage() {
		const tasks = localStorage.getItem('Tasks');
		if (tasks != null) {
			return JSON.parse(tasks);
		}
		return tasks;
	}
}