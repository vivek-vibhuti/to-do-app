document.querySelector('#btn').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Get the value from the input field
    let task = document.querySelector('input').value;

    // If the input is empty, do nothing
    if (!task) {
        return;
    }

    // Get existing tasks from localStorage or create an empty array if there are no tasks
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the array
    tasks.push(task);

    // Save the updated tasks array back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear the input field
    document.querySelector('input').value = '';

    // Update the task list display
    displayTasks();
});

// Function to display tasks
function displayTasks() {
    const taskList = document.querySelector('#task-list');
    
    // Clear the current list
    taskList.innerHTML = '';

    // Get tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Loop through the tasks and create list items
    tasks.forEach((task, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = task;
        
        // Add a delete button for each task
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteTask(index);
        });

        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });
}

// Function to delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Remove the task at the given index
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(); // Refresh the task list display
}

// Initial call to display tasks on page load
displayTasks();
