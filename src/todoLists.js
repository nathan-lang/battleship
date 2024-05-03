import { todoInit, projectInit } from "./initializers";
import { addDays, format } from "date-fns";

const date = new Date();

const todoItem = todoInit(
  "Cook Lunch",
  "Prepare vegetables, sauce, and cook meat.",
  format(addDays(date, 1), "MMM dd, yyyy"),
  "Urgent"
);

const todoItem2 = todoInit(
  "Bake Cake",
  "Bake strawberry cake to give to friend over the weekend.",
  format(addDays(date, 6), "MMM dd, yyyy"),
  "Not Urgent"
);

const todoItem3 = todoInit(
  "Submit Biology HW",
  "Finish exercises on page 25.",
  format(addDays(date, 1), "MMM dd, yyyy"),
  "Emergency"
);

const todoItem4 = todoInit(
  "Text Friends",
  "Host an event this weekend.",
  format(addDays(date, 4), "MMM dd, yyyy"),
  "Urgent"
);

const todoItem5 = todoInit(
  "Write song",
  "Write a song over the weekend for new album.",
  format(addDays(date, 5), "MMM dd, yyyy"),
  "Not Urgent"
);

const todoItem6 = todoInit(
  "Record Music",
  "Come to recording studio to record a song.",
  format(addDays(date, 7), "MMM dd, yyyy"),
  "Not Urgent"
);

let all = projectInit("All", [
  todoItem,
  todoItem2,
  todoItem3,
  todoItem4,
  todoItem5,
  todoItem6,
]);
let food = projectInit("Food", [todoItem, todoItem2]);
let school = projectInit("School", [todoItem3, todoItem4]);
let music = projectInit("Music", [todoItem5, todoItem6]);

export let projects = [all, food, school, music];
