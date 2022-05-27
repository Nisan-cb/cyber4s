"use strict";
console.log("TODO App");
const todoList = []; // array of tasks
function loadListFromLocalStorage(listArea) {
    for (const task of JSON.parse(localStorage.todoList)) {
        todoList.push(task);
        listArea.append(createNewTaskElement(task));
    }
}
function createNewTaskElement(newTask) {
    const newTaskElement = document.createElement('div');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkBox';
    const text = document.createElement('p');
    text.innerHTML = newTask.name;
    newTaskElement.append(checkBox);
    newTaskElement.append(text);
    newTaskElement.classList.add('task');
    return newTaskElement;
}
window.addEventListener('load', () => {
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('input');
    const listArea = document.getElementById('list-area');
    loadListFromLocalStorage(listArea);
    addBtn?.addEventListener('click', () => {
        console.log("added");
        console.log(input?.value);
        let newTask = {
            name: String(input?.value),
            isDone: false
        };
        todoList.push(newTask); //adding the new task to the list
        localStorage.todoList = JSON.stringify(todoList);
        let newTaskElement = createNewTaskElement(newTask);
        listArea?.append(newTaskElement);
    });
});
