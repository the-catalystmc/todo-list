class StatusCheck {
  container = document.querySelector('.container');

  allElements = this.container.getElementsByTagName('li');

  setChecked = (clone, stat) => {
    clone.querySelector('.check-item').checked = stat;
  }
}

const statusCheck = new StatusCheck();
export { statusCheck as default };