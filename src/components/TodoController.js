import { TodoList } from './TodoList.js';
import { getActiveListIndex } from '../utilities/ActiveListIndex.js';
import { getListItemsFromLocal, getListNameFromLocal, isLocalStorageEmpty } from '../utilities/LocalStorage.js';

export const todoController = function() {
  // Fill lists from localStorage
  let lists = [];
  if (!isLocalStorageEmpty()) {
    for (let i = 0; i < localStorage.length; i++) {
      const todoList = retrieveTodoList(i);
      lists.push(todoList);
    }
  }

  function addItem(listIndex, title, description, dueDate, starred = false, completed = false) {
    lists[listIndex].addItem(title, description, dueDate, starred, completed);
  }
  
  function addItemToActiveList(title, description, dueDate, starred = false, completed = false) {
    lists[getActiveListIndex()].addItem(title, description, dueDate, starred, completed);
  }

  function addList(listName) {
    lists.push(new TodoList(listName));
  }

  function getList(listIndex) {
    return lists[listIndex];
  }

  function getActiveList() {
    return lists[getActiveListIndex()];
  }

  function getAllLists() {
    return lists;
  }

  function hasLists() {
    return lists.length;
  }

  return {
    addItem,
    addItemToActiveList,
    addList,
    getList,
    getAllLists,
    getActiveList,
    hasLists
  };
}();

function retrieveTodoList(i) {
  const todoList = new TodoList(getListNameFromLocal(i));

  getListItemsFromLocal(i).forEach(item => {
    const { title, description, dueDate, starred, completed } = item;

    todoList.addItem(title, description, dueDate, starred, completed);
  });

  return todoList;
}
