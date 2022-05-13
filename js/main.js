const inputField = document.getElementById('newTask');
const add = document.getElementById('addTask');
const completedTasks = document.getElementById('completedTasks');
const completedCount = document.getElementById('completedCount');

const hiddenTasks = document.querySelector('.show-completed');
const shownTasks = document.querySelector('.hide-completed');

const deleteSVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.99998 12.6667C3.99998 13.4 4.59998 14 5.33331 14H10.6666C11.4 14 12 13.4 12 12.6667V4.66667H3.99998V12.6667ZM12.6666 2.66667H10.3333L9.66665 2H6.33331L5.66665 2.66667H3.33331V4H12.6666V2.66667Z" fill="#A3A3A3"/></svg>';
const checkSVG = '<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8.586L1.707 5.293L0.292999 6.707L5 11.414L14.707 1.707L13.293 0.292999L5 8.586Z" fill="#46FFF4"/></svg>';


function addItem(task) {
    // Create a task item
    const container = document.getElementById('todo');

    let todoItem = document.createElement('div');
    todoItem.className = 'todoItem';

    let left = document.createElement('div');
    left.className = 'left';

    let completeIcon = document.createElement('div');
    completeIcon.className = 'completeItem';

    completeIcon.addEventListener('click', completeItem);

    let taskItem = document.createElement('p');
    taskItem.innerHTML = task;

    left.appendChild(completeIcon);
    left.appendChild(taskItem);

    todoItem.appendChild(left);

    let deleteButton = document.createElement('button');
    deleteButton.className = 'deleteItem';
    deleteButton.innerHTML = deleteSVG;

    deleteButton.addEventListener('click', deleteItem);

    todoItem.appendChild(deleteButton);

    container.appendChild(todoItem);

}

function deleteItem() {
    let taskItem = this.parentNode;
    let parent = taskItem.parentNode;
    let parentId = parent.id;

    parent.removeChild(taskItem);

    if (parentId === 'completedTasks') {
        completedCount.innerHTML = "(" + completedTasks.childElementCount + ")";
    }

}

function completeItem() {
    // Get the id of the item's parent
    let taskItem = this.parentNode.parentNode;
    let taskText = taskItem.innerText;
    let parent = taskItem.parentNode;
    let parentId = parent.id;

    if (parentId === 'todo') {
        // Remove the item from todo and add it to the completed list
        parent.removeChild(taskItem);
        addToComplete(taskText);
        completedCount.innerHTML = "(" + completedTasks.childElementCount + ")";
    }
}

function addToComplete(value) {
    let container = document.getElementById('completedTasks');

    // Create a completed item
    let completedItem = document.createElement('div');
    completedItem.className = 'completedItem';

    // Create check icon
    let check = document.createElement('div');
    check.className = 'check';
    check.innerHTML = checkSVG;

    let left = document.createElement('div');
    left.className = 'left';

    
    // Create completed value
    let completedTask = document.createElement('p');
    completedTask.innerHTML = value;

    left.appendChild(check);
    left.appendChild(completedTask);

    completedItem.appendChild(left);

    // Create a delete button
    let deleteButton = document.createElement('button');
    deleteButton.className = 'deleteItem';
    deleteButton.innerHTML = deleteSVG;

    deleteButton.addEventListener('click', deleteItem);

    completedItem.appendChild(deleteButton);

    container.appendChild(completedItem);

    check.addEventListener('click', () => {
        // Remove the item from the completed list and add it to the todo
        container.removeChild(completedItem);
        // Update the completed tasks counter
        completedCount.innerHTML = "(" + container.childElementCount + ")";
        addItem(completedTask.innerText);
    });

}

hiddenTasks.addEventListener('click', () => {
    if (completedTasks.childElementCount !== 0) {
        let toggleTasks = document.querySelector('.toggleComplete');
        toggleTasks.style.display = 'block';

        document.querySelector('.show-completed').style.display = 'none';
        document.querySelector('.hide-completed').style.display = 'block';
    } 
});

shownTasks.addEventListener('click', () => {
    if (completedTasks.childElementCount !== 0) {
        let toggleTasks = document.querySelector('.toggleComplete');
        toggleTasks.style.display = 'none';

        document.querySelector('.show-completed').style.display = 'block';
        document.querySelector('.hide-completed').style.display = 'none';
    } 
});

add.addEventListener('click', () => {
    console.log('You clicked add');

    let value = inputField.value;

    if (value) {
        addItem(value);
        inputField.value = "";
    }
});
