console.log("TODO App");

interface Task {
    name: string,
    isDone: boolean,
    id: number
}



const todoList: Task[] = [];  // array of tasks

function loadListFromLocalStorage(listArea: HTMLElement) {
    if (!localStorage.todoList) return;
    for (const task of JSON.parse(localStorage.todoList)) {
        todoList.push(task);
        listArea.append(createNewTaskElement(task));
    }
}
function deleteTask(e: Event, task: Task) {
    todoList.splice(todoList.indexOf(task), 1); // remove from array
    localStorage.setItem('todoList', JSON.stringify(todoList)); // update the local storage
    (e.target as any).parentNode.remove();  // remove the HTML element
}

function editTask(e: Event, task: Task) {
    console.log("edit mode");
}

function checkTask(e: Event, task: Task) {
    task.isDone = !task.isDone;
    if (task.isDone)
        (e.target as any).parentNode.classList.add("done");
    else
        (e.target as any).parentNode.classList.remove("done");
    localStorage.setItem('todoList', JSON.stringify(todoList)); // update the local storage
}

function createNewTaskElement(newTask: Task): HTMLElement {
    const newTaskElement = document.createElement('div');
    // newTaskElement.id = `task-${newTask.id}`
    const checkBox = document.createElement('input');
    const deletIcon = document.createElement('i');
    deletIcon.classList.add('material-icons', 'delete-icon');
    deletIcon.innerText = "delete_forever";

    const editIcon = document.createElement('i');
    editIcon.classList.add('material-icons', "edit-icon");
    editIcon.innerText = "edit_note";

    checkBox.type = 'checkBox'
    const text = document.createElement('p');
    text.innerHTML = newTask.name;
    newTaskElement.append(checkBox);
    newTaskElement.append(text);
    newTaskElement.append(editIcon);
    newTaskElement.append(deletIcon);
    newTaskElement.classList.add('task');

    if (newTask.isDone)
        newTaskElement.classList.add('done');

    deletIcon.addEventListener('click', (e) => { deleteTask(e, newTask) });
    editIcon.addEventListener('click', (e) => { editTask(e, newTask) });
    checkBox.addEventListener('change', (e) => { checkTask(e, newTask) })
    return newTaskElement;
}





window.addEventListener('load', () => {
    const addBtn: HTMLElement = document.getElementById('add-btn') as HTMLElement;
    const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
    const listArea = document.getElementById('list-area') as HTMLElement;
    loadListFromLocalStorage(listArea);

    addBtn?.addEventListener('click', () => {
        console.log("added");
        console.log(input?.value);
        let newTask: Task = {   // creating new task object
            name: String(input?.value),
            isDone: false,
            id: todoList.length
        }
        todoList.push(newTask)  //adding the new task to the list
        localStorage.todoList = JSON.stringify(todoList);
        let newTaskElement: HTMLElement = createNewTaskElement(newTask);
        listArea?.append(newTaskElement);
    });
})