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
        for (const task of JSON.parse(localStorage.todoList))
            this.addNewTask(task.content, task.isDone);
        return this.taskArray;
    }
    addNewTask(content, mode = false) {
        const task = {
            content: content,
            isDone: mode
        };
        console.log(task);
        this.taskArray.push(task);
        const newTaskElement = document.createElement('div');
        const checkBox = document.createElement('input');
        const deletIcon = document.createElement('i');
        const editIcon = document.createElement('i');
        const text = document.createElement('p');
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
        editIcon.addEventListener('click', this.editTask);
        checkBox.addEventListener('change', () => { this.checked(task, text); });
        newTaskElement.append(checkBox);
        newTaskElement.append(text);
        newTaskElement.append(editIcon);
        newTaskElement.append(deletIcon);
        this.listAreaElemet.insertBefore(newTaskElement, this.listAreaElemet.firstChild);
        // this.listAreaElemet.append(newTaskElement)
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
    editTask() {
        console.log("edit mode");
    }
    saveChanges() {
        console.log("saved");
    }
}
window.addEventListener('load', () => {
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('input');
    const listArea = document.getElementById('list-area');
    const taskManager = new TaskManager(listArea);
    taskManager.loadTasksFromLoclStorage();
    addBtn?.addEventListener('click', () => {
        taskManager.addNewTask(input.value);
        localStorage.setItem('todoList', JSON.stringify(taskManager.taskArray));
        input.value = "";
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addBtn.click();
        }
    });
});
