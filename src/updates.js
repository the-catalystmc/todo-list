class UIUpdate {
  container = document.querySelector('.container');

  allElements = this.container.getElementsByTagName('li');

  editInput = (clone, updateFunc) => {
    clone.addEventListener('input', () => {
      updateFunc.save();
    });
  }

  removeTask = (clone, updateFunc) => {
    const deleteBtn = clone.querySelector('.delete');
    const moveBtn = clone.querySelector('.move-handle');
    clone.addEventListener('mouseover', () => {
      deleteBtn.style.display = 'flex';
      moveBtn.style.display = 'none';
    });

    clone.addEventListener('mouseout', () => {
      const deleteBtn = clone.querySelector('.delete');
      const moveBtn = clone.querySelector('.move-handle');
      deleteBtn.style.display = 'none';
      moveBtn.style.display = 'flex';
    });

    deleteBtn.addEventListener('click', () => {
      deleteBtn.parentNode.parentNode.removeChild(deleteBtn.parentNode);
      updateFunc.save();
    });
  }

  clearChecked = (clone, task, updateFunc) => {
    const status = task.completed;
    const clearBtn = document.querySelector('.clear-btn');
    clearBtn.addEventListener('click', () => {
      updateFunc.save();
      if (status) {
        this.container.removeChild(clone);
        updateFunc.save();
      }
    });
  }
}

const uiUpdate = new UIUpdate();
export { uiUpdate as default };