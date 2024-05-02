import { TodoList } from './TodoList.js';

export function TodoController() {
  let lists = [
    new TodoList('Default')
  ];

  function addItem(title, description, dueDate, priority, listIndex = 0) {
    lists[listIndex].addItem(title, description, dueDate, priority);
  }

  function getList(listIndex = 0) {
    return lists[listIndex];
  }

  function getAllLists() {
    return lists;
  }

  return {
    addItem,
    getList,
    getAllLists,
  };
}