export default class Draggables {
	constructor(list) {
		this.list = list;

	}

	updateList() {
		let listTarget = this.list;
		listTarget.classList.add("list-style");
		let items = listTarget.getElementsByTagName("li");
		let current = null;
		let entered = null;

		for (let item of items) {
			item.addEventListener('dragstart', (e) => {
				current = e.target;
				for (let it of items) {
					if (it == current) {
						it.classList.add("hint");
					} else {
						it.classList.add("nothint");
					}
				}
			})

			item.addEventListener("dragend", () => {
				for (let it of items) {
					it.classList.remove("hint");
					it.classList.remove("nothint");
					it.classList.remove("active");
				}

			});

			item.addEventListener('dragenter', (e) => {
				entered = e.target;
				for (let it of items) {
					if (it == entered) {
						it.classList.add("active");
					}
				}
			})

			item.addEventListener("dragleave", () => {
				for (let it of items) {
					if (it !== entered) {
						it.classList.remove("active");
					}
				}
			});

			item.addEventListener("dragover", (e) => {
				e.preventDefault();
			});

			item.addEventListener("drop", (e) => {
				e.preventDefault();

				if (entered != current) {
					let currentpos = 0;
					let droppedpos = 0;
					for (let i = 0; i < items.length; i++) {
						if (current == items[i]) {
							currentpos = i;
						}
						if (entered == items[i]) {
							droppedpos = i;
						}
						if (currentpos < droppedpos) {
							entered.parentNode.insertBefore(current, entered.nextSibling);
						} else if (currentpos > droppedpos) {
							entered.parentNode.insertBefore(current, entered);
						} else {
							current = current;
						}
					}
				}
			});
		}
	}
}