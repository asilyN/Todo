document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('todo');
  const taskList = document.getElementById('task-list');

  // Load tasks from local storage on page load
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to save tasks to local storage
  const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Function to create a task element
  const createTaskElement = (task) => {
      const li = document.createElement('li');
      li.classList.add('task-item');

      // Checkbox to mark task as done
     // Checkbox to mark task as done
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.classList.add('task-checkbox');
      checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();


      });

      // Task text
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      taskText.classList.add('task-text');

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';  // Trashcan icon
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
          const index = tasks.indexOf(task);
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(taskText);
      li.appendChild(deleteButton);

      return li;
  };

  // Function to render tasks
  const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task) => {
          const taskElement = createTaskElement(task);
          taskList.appendChild(taskElement);
      });
  };

  // Add task form submit handler
  taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      const newTask = {
          text: taskText,
          completed: false
      };

      tasks.push(newTask);
      saveTasks();
      renderTasks();

      taskInput.value = '';  // Clear the input field
  });

  // Render tasks on page load
  renderTasks();
});
