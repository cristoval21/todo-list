import { TodoList } from './TodoList.js';
import { getActiveListIndex } from '../utilities/ActiveListIndex.js';

export const todoController = function() {
  let lists = [
    new TodoList('My List'),
    new TodoList('Work')
  ];

  function addItem(title, description, dueDate, priority, listIndex) {
    lists[listIndex].addItem(title, description, dueDate, priority);
  }
  
  function addItemToActiveList(title, description, dueDate, priority) {
    lists[getActiveListIndex()].addItem(title, description, dueDate, priority);
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

  return {
    addItem,
    addItemToActiveList,
    getList,
    getAllLists,
    getActiveList
  };
}();