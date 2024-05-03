export function todoInit(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

export function projectInit(title, todoList) {
  return {
    title,
    todoList,
  };
}
