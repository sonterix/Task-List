/* --CONSTS-- */
const inputTask = document.querySelector('#input-task');
const taskList = document.querySelector('#task-list');
const taskButton = document.querySelector('#task-button');
const clearButton = document.querySelector('#clear-button');

// call main function
loadEventListeners();


// MAIN FUNCTION
function loadEventListeners(){
    // add task
    taskButton.addEventListener('click', addTask);
    // remove task
    taskList.addEventListener('click', removeTask)
    // claer all tasks
    clearButton.addEventListener('click', clearTask)
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

    // clear input field
    inputTask.value = '';
}

// Remove Task
function removeTask(e){
    let target = e.target;
    if(target.className === 'fas fa-times'){
        
        confirm('Are you sure?') ? target.parentNode.remove() : '';
    }
}

// Clear all Tasks
function clearTask(e){
    e.preventDefault();
    taskList.innerHTML = '';
}