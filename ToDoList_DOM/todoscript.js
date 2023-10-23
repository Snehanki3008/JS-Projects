
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const totalTasksElement = document.getElementById("totalTasks");
    const completedTasksElement = document.getElementById("completedTasks");

    let totalTasks = 0;
    let completedTasks = 0;

    function updateTaskCount() {
        totalTasksElement.textContent = totalTasks;
        completedTasksElement.textContent = completedTasks;
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");
        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = taskText;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        taskCheckbox.addEventListener("change", function() {
            if (taskCheckbox.checked) {
                li.className = "completed";
                completedTasks++;
            } else {
                li.className = "";
                completedTasks--;
            }
            updateTaskCount();
        });

        deleteButton.addEventListener("click", function() {
            li.remove();
            totalTasks--;
            if (taskCheckbox.checked) {
                completedTasks--;
            }
            updateTaskCount();
        });

        li.appendChild(taskCheckbox);
        li.appendChild(taskTextSpan);
        li.appendChild(deleteButton);
        return li;
    }

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
            totalTasks++;
            updateTaskCount();
            taskInput.value = "";
        }
    });


