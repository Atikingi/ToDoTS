import { ToDoItem } from './types';
import { v4 as uuidV4 } from 'uuid';

class ToDo {
    toDoArray: ToDoItem[] = [];
    taskText = document.getElementById('form-text') as HTMLInputElement;
    toDoForm = document.getElementById('todo-form') as HTMLFormElement;
    toDoList = document.getElementById('todo-list') as HTMLUListElement;

    submitForm() {
        this.toDoForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (this.taskText.value === '') return;

            const newTask: ToDoItem = {
                id: uuidV4(),
                text: this.taskText.value,
                completed: false,
            };

            this.renderTask(newTask);
            this.saveTask(newTask);
        });
    }

    saveTask(task: ToDoItem) {
        this.toDoArray.push(task);

        this.recordTasksList();
    }

    recordTasksList() {
        const toDoArrayStringify: string = JSON.stringify(this.toDoArray);

        localStorage.setItem('tasks', toDoArrayStringify);
    }

    loadingTasks() {
        const tasks = localStorage.getItem('tasks');
        if (!tasks) return;

        this.toDoArray = JSON.parse(tasks);

        this.renderTasks();
    }

    renderTasks() {
        this.toDoArray.map((task: ToDoItem) => {
            const { text, id, completed } = task;

            this.createTask(text, id, completed);
        });
        this.statusTaskHandler();
        this.deleteTaskHandler();
    }

    renderTask(task: ToDoItem) {
        const { text, id, completed } = task;

        this.createTask(text, id, completed);
        this.taskText.value = '';
    }

    createTask(text: string, id: string, completed: boolean) {
        const task = document.createElement('li') as HTMLLIElement;
        const taskLabel = document.createElement('label') as HTMLLabelElement;
        const taskCheckbox = document.createElement(
            'input'
        ) as HTMLInputElement;
        const deleteButton = document.createElement(
            'button'
        ) as HTMLButtonElement;
        const taskText = document.createElement('span') as HTMLSpanElement;

        taskText.textContent = text;
        task.id = id;
        taskCheckbox.setAttribute('type', 'checkbox');
        taskCheckbox.checked = completed;
        deleteButton.id = 'delete-button';
        deleteButton.dataset.taskid = id;

        taskLabel.classList.add('todo__list-label');
        taskText.classList.add('todo__task-text');
        deleteButton.classList.add('todo__delete-button');
        task.classList.add('todo__task-list-item');
        taskCheckbox.classList.add('todo__task-input');

        task.appendChild(taskLabel);
        taskLabel.appendChild(taskCheckbox);
        taskLabel.appendChild(taskText);
        taskLabel.appendChild(deleteButton);

        this.toDoList.appendChild(task);
    }

    deleteTaskHandler() {
        this.toDoList.addEventListener('click', this.deleteTask.bind(this));
    }

    deleteTask(event: Event) {
        const target = event.target as HTMLInputElement;

        if (target.dataset.taskid) {
            const indexOfTask = () => {
                return this.toDoArray.findIndex(
                    (task) => task.id === target.dataset.taskid
                );
            };

            this.toDoArray.splice(indexOfTask(), 1);

            target.closest('li')?.remove();
            this.recordTasksList();

            target.removeEventListener('click', this.deleteTask);
        }
    }

    statusTaskHandler() {
        this.toDoList.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement;
            const currentTaskId = target.closest('li')?.id;

            this.toDoArray.map((task) => {
                if (task.id === currentTaskId) {
                    task.completed = target.checked;
                }
            });

            const toDoArrayStringify: string = JSON.stringify(this.toDoArray);

            localStorage.setItem('tasks', toDoArrayStringify);
        });
    }
}

export const toDoItem = new ToDo();

toDoItem.loadingTasks();
toDoItem.submitForm();
