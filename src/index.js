import "./style.css";
import { projects } from "./todoLists.js";
import {
  navbar,
  renderToDo,
  renderProjects,
  addButtons,
} from "./pageSections.js";

document.body.appendChild(navbar());
document.body.appendChild(renderProjects(projects));
document.body.appendChild(renderToDo(projects[0].todoList));
document.body.appendChild(addButtons());
