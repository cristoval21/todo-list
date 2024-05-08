import { TodoList } from './TodoList.js';
import { getActiveListIndex } from '../utilities/ActiveListIndex.js';

export const todoController = function() {
  let lists = [];

  function addItem(title, description, dueDate, listIndex) {
    lists[listIndex].addItem(title, description, dueDate);
  }
  
  function addItemToActiveList(title, description, dueDate) {
    lists[getActiveListIndex()].addItem(title, description, dueDate);
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