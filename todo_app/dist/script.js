"use strict";
console.log("TODO App");
class TaskManager {
    constructor(listAreaElement) {
        this.listAreaElemet = listAreaElement;
        this.taskArray = [];
    }
    lenght() {
        return this.taskArray.length;
    }
    loadTasksFromLoclStorage() {
        if (!localStorage.todoList)
            return null;
        for (const [i, task] of JSON.parse(localStorage.todoList).entries())
            this.addNewTask(task.content, i, task.isDone);
        return this.taskArray;
    }
    addNewTask(content, id, mode = false) {
        const task = {
            content: content,
            isDone: mode
            // id: `task-${id}`
        };
        this.taskArray.push(task);
        const newTaskElement = document.createElement('div');
        newTaskElement.draggable = true;
        newTaskElement.id = String(id);
        newTaskElement.addEventListener('dragstart', (e) => {
            console.log(e.target);
            e.dataTransfer?.setData('text/plain', e.target.id);
            setTimeout(() => {
                newTaskElement.style.display = "none";
            }, 0);
        });
        // newTaskElement.addEventListener('dragover', (e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        // })
        newTaskElement.addEventListener('drop', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const id = e.dataTransfer?.getData('text/plain');
            console.log(id);
            let draggableElement = document.getElementById(id);
            console.log(draggableElement);
            this.listAreaElemet.insertBefore(draggableElement, e.target);
            // (e.target as HTMLElement).parentNode?.appendChild(draggableElement as Node);
            draggableElement.style.display = 'flex';
            this.swapId(Number(draggableElement.id), Number(e.target.id));
        });
        const checkBox = document.createElement('input');
        const deletIcon = document.createElement('i');
        const editIcon = document.createElement('i');
        const textContainer = document.createElement('span');
        const text = document.createElement('p');
        textContainer.append(text);
        deletIcon.classList.add("material-icons", "delete-icon");
        deletIcon.innerHTML = "delete";
        editIcon.classList.add("material-icons", "edit-icon");
        editIcon.innerHTML = "edit";
        newTaskElement.classList.add('task');
        checkBox.type = 'checkbox';
        text.textContent = task.content;
        if (task.isDone) {
            text.classList.add('done');
            checkBox.checked = true;
        }
        deletIcon.addEventListener('click', () => { this.deleteTask(task, newTaskElement); });
        editIcon.addEventListener('click', () => { this.editTask(task, textContainer, editIcon); });
        checkBox.addEventListener('change', () => { this.checked(task, text); });
        newTaskElement.append(checkBox);
        newTaskElement.append(textContainer);
        newTaskElement.append(editIcon);
        newTaskElement.append(deletIcon);
        this.listAreaElemet.insertBefore(newTaskElement, this.listAreaElemet.firstChild);
    }
    swapId(index1, index2) {
        const task = this.taskArray[index1];
        if (index1 > index2) {
            for (let i = index1 - 1; i > index2; i--) {
                this.taskArray[i + 1] = this.taskArray[i];
            }
            this.taskArray[index2 + 1] = task;
        }
        else {
            for (let i = index1 + 1; i <= index2; i++) {
                this.taskArray[i - 1] = this.taskArray[i];
            }
            this.taskArray[index2] = task;
        }
        // this.taskArray[index1] = this.taskArray[index2];
        console.log(this.taskArray);
        localStorage.setItem('todoList', JSON.stringify(this.taskArray));
    }
    checked(task, textElement) {
        task.isDone = !task.isDone;
        if (task.isDone)
            textElement.classList.add('done');
        else
            textElement.classList.remove('done');
        localStorage.setItem('todoList', JSON.stringify(this.taskArray));
    }
    deleteTask(task, taskElement) {
        console.log("delete");
        this.taskArray.splice(this.taskArray.indexOf(task), 1);
        taskElement.remove();
        localStorage.setItem('todoList', JSON.stringify(this.taskArray));
    }
    editTask(task, textContainer, editIcon) {
        console.log("edit mode");
        textContainer.innerHTML = "";
        const inputElement = document.createElement('input');
        inputElement.value = task.content;
        textContainer.append(inputElement);
        const saveIcon = document.createElement('i');
        saveIcon.classList.add('material-icons', "save-icon");
        saveIcon.innerHTML = "save";
        editIcon.style.display = 'none';
        editIcon.parentNode?.append(saveIcon);
        saveIcon.addEventListener('click', () => { this.saveChanges(task, inputElement, saveIcon, editIcon); });
        inputElement.addEventListener('keypress', (e) => {
            console.log('clicked');
            if (e.key === 'Enter')
                saveIcon.click();
        });
    }
    saveChanges(task, inputElement, saveIcon, editIcon) {
        console.log("saved");
        task.content = inputElement.value;
        inputElement.parentNode.innerHTML = inputElement.value;
        saveIcon.remove();
        editIcon.style.display = 'inline';
        localStorage.setItem('todoList', JSON.stringify(this.taskArray));
    }
}
window.addEventListener('load', () => {
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('input');
    const listArea = document.getElementById('list-area');
    const taskManager = new TaskManager(listArea);
    taskManager.loadTasksFromLoclStorage();
    addBtn?.addEventListener('click', () => {
        if (!input.value.trim().length)
            return;
        taskManager.addNewTask(input.value, taskManager.taskArray.length);
        localStorage.setItem('todoList', JSON.stringify(taskManager.taskArray));
        input.value = "";
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // e.preventDefault()
            addBtn.click();
        }
    });
    // listArea.addEventListener('dragenter', (e) => {
    //     e.preventDefault();
    //     console.log("ok");
    //     // listArea.style.cursor = 'pointer'
    // })
    listArea.addEventListener('drop', (e) => {
        const id = e.dataTransfer?.getData('text/plain');
        // console.log("leaved")
        // console.log(id);
        let draggableElement = document.getElementById(id);
        draggableElement.style.display = 'flex';
    });
    // listArea.addEventListener('dragleave', (e) => {
    //     const id = e.dataTransfer?.getData('text/plain');
    //     // console.log("leaved")
    //     // console.log(id);
    //     let draggableElement = document.getElementById(id as string);
    //     (draggableElement as HTMLElement).style.display = 'flex';
    // })
    listArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, true);
});
