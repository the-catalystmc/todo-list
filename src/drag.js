export default class Draggables {
  current;

  entered;

  constructor(list) {
    this.list = list;
  }

  updateList() {
    const listTarget = this.list;
    listTarget.classList.add('list-style');
    const items = listTarget.getElementsByTagName('li');

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      item.addEventListener('dragstart', (e) => {
        this.current = e.target;
        for (let i = 0; i < items.length; i += 1) {
          const it = items[i];
          if (it === this.current) {
            it.classList.add('hint');
          } else {
            it.classList.add('nothint');
          }
        }
      });

      item.addEventListener('dragend', () => {
        for (let i = 0; i < items.length; i += 1) {
          const it = items[i];
          it.classList.remove('hint');
          it.classList.remove('nothint');
          it.classList.remove('active');
        }
      });

      item.addEventListener('dragenter', (e) => {
        this.entered = e.target;
        for (let i = 0; i < items.length; i += 1) {
          const it = items[i];
          if (it === this.entered) {
            it.classList.add('active');
          }
        }
      });

      item.addEventListener('dragleave', () => {
        for (let i = 0; i < items.length; i += 1) {
          const it = items[i];
          if (it !== this.entered) {
            it.classList.remove('active');
          }
        }
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();

        if (this.entered !== this.current) {
          let currentpos = 0;
          let droppedpos = 0;
          for (let i = 0; i < items.length; i += 1) {
            if (this.current === items[i]) {
              currentpos = i;
            }
            if (this.entered === items[i]) {
              droppedpos = i;
            }
            if (currentpos < droppedpos) {
              this.entered.parentNode.insertBefore(this.current, this.entered.nextSibling);
            } else if (currentpos > droppedpos) {
              this.entered.parentNode.insertBefore(this.current, this.entered);
            } else {
              this.current.classList.add('hint');
            }
          }
        }
      });
    }
  }
}
