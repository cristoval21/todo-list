import { TodoList } from './TodoList.js';
import { getActiveListIndex } from '../utilities/ActiveListIndex.js';

export const todoController = function() {
  // localStorage.clear();
  let lists = [];
  if (localStorage.length) {
    for (let i = 0; i < localStorage.length; i++) {
      lists.push(new TodoList(localStorage.key(i)));
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