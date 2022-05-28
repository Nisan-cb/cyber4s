console.log("TODO App");

interface Task {
    content: string,
    isDone: boolean
}

class TaskManager {
    taskArray: Task[];  // array of tasks
    listAreaElemet: HTMLElement;
    constructor(listAreaElement: HTMLElement) {
        this.listAreaElemet = listAreaElement;
        this.taskArray = [];
    }

    lenght(): Number {
        return this.taskArray.length;
    }

    loadTasksFromLoclStorage(): Task[] | null {    // load tasks from local storege
        if (!localStorage.todoList) return null;
        for (const task of JSON.parse(localStorage.todoList))
            this.addNewTask(task.content, task.isDone)
        return this.taskArray;
    }

    addNewTask(content: string, mode: boolean = false) {
        const task: Task = {
            content: content,
            isDone: mode
        };
        this.taskArray.push(task);
        const newTaskElement = document.createElement('div');
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
        newTaskElement.classList.add('task')
        checkBox.type = 'checkbox';
        text.textContent = task.content;

        if (task.isDone) {
            text.classList.add('done');
            checkBox.checked = true;
        }
        deletIcon.addEventListener('click', () => { this.deleteTask(task, newTaskElement) });
        editIcon.addEventListener('click', () => { this.editTask(task, textContainer, editIcon) });
        checkBox.addEventListener('change', () => { this.checked(task, text) });

        newTaskElement.append(checkBox);
        newTaskElement.append(textContainer);
        newTaskElement.append(editIcon);
        newTaskElement.append(deletIcon);

        this.listAreaElemet.insertBefore(newTaskElement, this.listAreaElemet.firstChild)
    }

    checked(task: Task, textElement: HTMLParagraphElement) {
        task.isDone = !task.isDone;
        if (task.isDone)
            textElement.classList.add('done');
        else
            textElement.classList.remove('done');

        localStorage.setItem('todoList', JSON.stringify(this.taskArray));
    }

    deleteTask(task: Task, taskElement: HTMLDivElement) {
        console.log("delete")
        this.taskArray.splice(this.taskArray.indexOf(task), 1);
        taskElement.remove();
        localStorage.setItem('todoList', JSON.stringify(this.taskArray));
    }
    editTask(task: Task, textContainer: HTMLElement, editIcon: HTMLElement) {
        console.log("edit mode")
        textContainer.innerHTML = "";
        const inputElement = document.createElement('input');
        inputElement.value = task.content;
        textContainer.append(inputElement);

        const saveIcon = document.createElement('i');
        saveIcon.classList.add('material-icons', "save-icon");
        saveIcon.innerHTML = "save";
        editIcon.style.display = 'none';
        editIcon.parentNode?.append(saveIcon)
        saveIcon.addEventListener('click', () => { this.saveChanges(task, inputElement, saveIcon, editIcon) })
        inputElement.addEventListener('keypress', (e) => {
            console.log('clicked')
            if (e.key === 'Enter')
                saveIcon.click();
        })
    }

    saveChanges(task: Task, inputElement: HTMLInputElement, saveIcon: HTMLElement, editIcon: HTMLElement) {
        console.log("saved");
        task.content = inputElement.value;
        (inputElement.parentNode as HTMLElement).innerHTML = inputElement.value;
        saveIcon.remove();
        editIcon.style.display = 'inline'
        localStorage.setItem('todoList', JSON.stringify(this.taskArray));
    }
}







window.addEventListener('load', () => {
    const addBtn: HTMLElement = document.getElementById('add-btn') as HTMLElement;
    const input: HTMLInputElement = document.getElementById('input') as HTMLInputElement;
    const listArea = document.getElementById('list-area') as HTMLElement;

    const taskManager: TaskManager = new TaskManager(listArea);
    taskManager.loadTasksFromLoclStorage();

    addBtn?.addEventListener('click', () => {
        if (!input.value.trim().length) return;
        taskManager.addNewTask(input.value)
        localStorage.setItem('todoList', JSON.stringify(taskManager.taskArray));
        input.value = "";
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // e.preventDefault()
            addBtn.click();
        }
    })
})