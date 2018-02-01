/* --CONSTS-- */
const inputTask = document.querySelector('#input-task');
const taskList = document.querySelector('#task-list');
const taskButton = document.querySelector('#task-button');
const clearButton = document.querySelector('#clear-button');
const inputFilter = document.querySelector('#input-filter');

// call main function
loadEventListeners();


/*_________________________________________________________*/


// MAIN FUNCTION
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task
    taskButton.addEventListener('click', addTask);
    // remove task
    taskList.addEventListener('click', removeTask)
    // claer all tasks
    clearButton.addEventListener('click', clearTask);
    // filter tasks
    inputFilter.addEventListener('keyup', filterTasks)
}


/* --FUNCTONS-- */
// Add task
function addTask(e){
    e.preventDefault();
    const li = document.createElement('li');
    const i = document.createElement('i');

    // check input
    if(inputTask.value === ''){
        alert('Add a Task');
        return false;
    }

    // create a task
    let currentVal = inputTask.value;
    li.appendChild(document.createTextNode(currentVal));
    i.className = 'fas fa-times';
    li.appendChild(i);
    taskList.appendChild(li);

    // added to ls
    storeTaskInLocalStorage(inputTask.value);

    // clear input field
    inputTask.value = '';
}

// Remove Task
function removeTask(e){
    let target = e.target;
    if(target.className === 'fas fa-times'){
        confirm('Are you sure?') ? target.parentNode.remove() : '';

        // Remove Task form LS
        removeTaskFromLocalStorage(target.parentNode);
    }
}

// Clear all Tasks
function clearTask(e){
    e.preventDefault();
    taskList.innerHTML = '';

    // Clear all Tasks from LS
    removeAllTaskFromLocalStorage();
}

// Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('#task-list li').forEach(function(value){
        const item = value.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            value.style.display = 'grid';
        } else {
            value.style.display = 'none';
        }
    });
}


// Store Task
function storeTaskInLocalStorage(task){
    let tasks = checkTasksLS();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks from LS
function getTasks(){
    let tasks = checkTasksLS();
    
    tasks.forEach(function(value){
        const li = document.createElement('li');
        const i = document.createElement('i');

        // create a task
        let currentVal = value;
        li.appendChild(document.createTextNode(currentVal));
        i.className = 'fas fa-times';
        li.appendChild(i);
        taskList.appendChild(li);
    });  
}

// Remove Tasks from LS
function removeTaskFromLocalStorage(task){
    let tasks = checkTasksLS();

    tasks.forEach(function(value, id){
        if(task.textContent === value){
            tasks.splice(id, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));    
}

// Clear all Tasks from LS
function removeAllTaskFromLocalStorage(){
    localStorage.clear();   
}

// Check LS for "tasks"
function checkTasksLS(){
    let tasks;

    // get tasks form local storage
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
}