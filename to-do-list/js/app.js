// TODO app (dienas plānotajs)
// Nokopējiet šo mapi savā mājas darba mapē VardsUzvards
// Aplikācijas darbības principu var apskatit video appDemo.mp4

/* Mums nepieciešams izviedot nelielu todo aplikaciju ar iespēju pievienot, izdzēst un atzīmēt izdarīto ierakstu
    Mums nepieciešams 4 funkcijas
        addTask() - pievienot notikumu
            1 - iegūt input lauka vērtību
            2 - izveido object priekš ieraksta, kas satur input vērtību un done statu
            3 - izsaukt funkciju saveToLocalStorage
            4 - izsaukt renderTasks() funkciju

        saveToLocalStorage() - saglabā ierakstu
            1 - jāizmanto JSON.stringify
            2 - jāsaglabā masīvs ar ierakstiem taskList

        renderTask() - izvada sarakstu notikumu
            1 - jāizmanto innerHTML
            2 - jāizmanto vienu no cikliem lai iziet cauri visam localstorage taskList ierakstiem
            3 - šis html palidzes izvadit datus
                    `<li class="list-group-item">
                        <input class="form-check-input" onclick="toggleDone(event)" data-index="${i}" type="checkbox" ${isTaskChecked}>
                        <span class="task-text">${item.taskText}</span>
                        <button class="btn btn-secondary" onclick="removeTask(event)" data-index="${i}">Remove</button>
                    </li>`;`;
            4 - Gadijuma ja elements ir apziments ka izdarits mums nepiecišams to atzīmēt vizuāli. Ja izmantojam checkbox, tad ar checked atribūtu
                Lidz ar to nepieciešams izveidot parbaudi if else lai parbaudit task.done === 'true'

        toggleDone() - atzimet ka izdarito
            1 - nomainam elementam done vertibu done: false --> done: true un izsaucam renderTask funkciju lai atjauno sarakstu


*/
let taskAdder;
let myTasksContainer;
let taskList;

window.onload = () => {
    taskInput = document.getElementById("taskInput");
    addBtn = document.getElementById('addBtn');
    myTasksContainer = document.getElementById('myTasks');
    taskList = JSON.parse(localStorage.getItem('taskList'));

    if (!taskList) {
        taskList = [];
    }

    addBtn.addEventListener('click', addTask);

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask()
        }
    }
    )
    renderTasks();
}

const addTask = () => {

    if (taskInput.value) {
        const task = {
            taskText: taskInput.value.charAt(0).toUpperCase() + taskInput.value.substr(1),
            done: false
        }
        taskInput.value = "";
        taskList.push(task);
        saveToLocalStorage();
        renderTasks();
    }

    else {
        alert("Please type in description")
    }
}

const removeTask = (event) => {
    let taskIndex = event.target.dataset.index;
    taskList.splice(taskIndex, 1);
    saveToLocalStorage();
    renderTasks();

}

const toggleDone = (event) => {
    taskIndex = event.target.dataset.index;


    if (taskList[taskIndex].done) {

        taskList[taskIndex].done = false;
    } else {

        taskList[taskIndex].done = true;
    }


    saveToLocalStorage();
}

const saveToLocalStorage = () => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

const renderTasks = () => {
    let tasksToRender = [];
    taskList.forEach((item, i) => {
        let isTaskChecked = item.done ? "checked" : "";
        let task = `
        <li class="list-group-item">
            <span class="task-number">${i + 1}</span>
            <span class="task-text">${item.taskText}</span>
            <input class="form-check-input" onclick="toggleDone(event)" data-index="${i}" type="checkbox" ${isTaskChecked}>
            <button class="btn btn-secondary" onclick="removeTask(event)" data-index="${i}">Remove</button>
        </li>`;


        tasksToRender.push(task);
    })

    myTasksContainer.innerHTML = tasksToRender.join('');
}

