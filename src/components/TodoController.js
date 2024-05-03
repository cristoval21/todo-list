import { TodoList } from './TodoList.js';

export const todoController = function() {
  let lists = [
    new TodoList('My List'),
    new TodoList('Work')
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
}();