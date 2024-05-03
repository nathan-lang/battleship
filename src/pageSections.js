import { projects } from "./todoLists.js";
import { projectInit, todoInit } from "./initializers.js";

export function navbar() {
  const navbar = document.createElement("div");
  navbar.classList.add("navbar");
  navbar.textContent = "my todo";
  return navbar;
}

export function renderProjects(projects) {
  let projectSection = document.createElement("div");
  projectSection.classList.add("projects");
  for (let i = 0; i < projects.length; i++) {
    const project = document.createElement("div");
    project.textContent = projects[i].title;
    project.addEventListener("click", function () {
      const todos = document.body.querySelector(".todos");
      document.body.replaceChild(renderToDo(projects[i].todoList), todos);
    });
    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("remove-project");
    removeButton.addEventListener("click", function () {
      projects.splice(i, 1);
      document.body.replaceChild(renderProjects(projects), projectSection);
      const todos = document.body.querySelector(".todos");
      document.body.replaceChild(renderToDo(projects[0].todoList), todos);
    });
    project.appendChild(removeButton);
    projectSection.appendChild(project);
  }
  return projectSection;
}

export function renderToDo(todoList) {
  const todoSection = document.createElement("div");
  todoSection.classList.add("todos");
  for (let i = 0; i < todoList.length; i++) {
    const todo = document.createElement("div");
    const todoHeader = document.createElement("div");
    todoHeader.classList.add("todo-header");
    todoHeader.textContent = todoList[i].title;
    const finish = document.createElement("button");
    finish.textContent = "-";
    finish.addEventListener("click", function () {
      todoList.splice(i, 1);
      document.body.replaceChild(renderToDo(todoList), todoSection);
    });
    const showDetails = document.createElement("button");
    showDetails.textContent = "Details";
    let detailsOn = false;
    showDetails.addEventListener("click", function () {
      const details = document.createElement("div");
      if (!detailsOn) {
        const detailsList = document.createElement("ul");
        detailsList.classList.add("details");
        const description = document.createElement("li");
        description.textContent = "Description: " + todoList[i].description;
        const dueDate = document.createElement("li");
        dueDate.textContent = "Due Date: " + todoList[i].dueDate;
        const priority = document.createElement("li");
        priority.textContent = "Priority: " + todoList[i].priority;
        todo.style.height = "150px";
        detailsList.appendChild(description);
        detailsList.appendChild(dueDate);
        detailsList.appendChild(priority);
        const detailsButtons = document.createElement("div");
        detailsButtons.classList.add("details-buttons");
        const changeDesc = document.createElement("button");
        changeDesc.textContent = "Change Description";
        changeDesc.addEventListener("click", function () {
          let input = prompt("Enter your new description:");
          todoList[i].description = input;
          description.textContent = "Description: " + todoList[i].description;
        });
        const changeDate = document.createElement("button");
        changeDate.textContent = "Change Due Date";
        changeDate.addEventListener("click", function () {
          let input = prompt("Enter your new date:");
          todoList[i].dueDate = input;
          dueDate.textContent = "Due Date: " + todoList[i].dueDate;
        });
        const changePriority = document.createElement("button");
        changePriority.textContent = "Change Priority";
        changePriority.addEventListener("click", function () {
          let input = prompt("Change the priority here:");
          todoList[i].priority = input;
          priority.textContent = "Priority: " + todoList[i].priority;
        });
        detailsButtons.appendChild(changeDesc);
        detailsButtons.appendChild(changeDate);
        detailsButtons.appendChild(changePriority);
        details.appendChild(detailsList);
        details.appendChild(detailsButtons);
        todo.appendChild(details);
        detailsOn = true;
      } else {
        todo.removeChild(todo.children[1]);
        todo.style.height = "50px";
        detailsOn = false;
      }
    });
    todoHeader.appendChild(finish);
    todoHeader.appendChild(showDetails);
    todo.appendChild(todoHeader);
    todoSection.appendChild(todo);
  }
  const newTodo = document.createElement("button");
  newTodo.textContent = "+ To-do";
  newTodo.classList.add("new-todo-button");
  newTodo.addEventListener("click", function () {
    let userInput = prompt("Enter your new to-do name:");
    let todoObj = todoInit(userInput, "", "", "");
    todoList.push(todoObj);
    document.body.replaceChild(renderToDo(todoList), todoSection);
  });
  todoSection.appendChild(newTodo);
  return todoSection;
}

export function addButtons() {
  const buttonArea = document.createElement("div");
  buttonArea.classList.add("buttons");
  const newProject = document.createElement("button");
  newProject.textContent = "+ Project";
  newProject.classList.add("new-project-button");
  newProject.addEventListener("click", function () {
    let userInput = prompt("Enter your new project name:");
    let projectObj = projectInit(userInput, []);
    projects.push(projectObj);
    let projectSection = document.body.querySelector(".projects");
    document.body.replaceChild(renderProjects(projects), projectSection);
  });

  buttonArea.appendChild(newProject);
  return buttonArea;
}
