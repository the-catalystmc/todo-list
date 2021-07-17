import allTasks from './index';


class UIUpdate {
    container = document.querySelector('.container');

    allElements = this.container.getElementsByTagName('li');

    editInput = (clone, updateFunc) => {
        clone.addEventListener('input', () => {
            console.log('text inputted');
            updateFunc.save()
          })
    }

    removeTask = (clone, updateFunc) => {
        const deleteBtn = clone.querySelector('.delete');
        const moveBtn = clone.querySelector('.move-handle');
        clone.addEventListener('mouseover', () => {
            deleteBtn.style.display = 'flex';
            moveBtn.style.display = 'none';
            console.log('ready')
          })
      
          clone.addEventListener('mouseout', () => {
            const deleteBtn = clone.querySelector('.delete');
            const moveBtn = clone.querySelector('.move-handle');
            deleteBtn.style.display = 'none';
            moveBtn.style.display = 'flex';
          })

          deleteBtn.addEventListener('click', () => {
            console.log(clone);
            deleteBtn.parentNode.parentNode.removeChild(deleteBtn.parentNode);
            updateFunc.save()
        })
    }
}

const uiUpdate = new UIUpdate();
export { uiUpdate as default };