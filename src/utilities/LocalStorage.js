import { todoController } from "../components/TodoController";

function saveListToLocal() {
  const inputAddList = document.querySelector('.sidebar__input-add-list')
  localStorage.setItem(inputAddList.value, '');
}

function isLocalStorageEmpty() {
  return (localStorage.length === 0) ? true : false;
}

function getListNameFromLocal(index) {
  return localStorage.key(index);
}

function getListItemsFromLocal(index) {
  return JSON.parse(
    localStorage.getItem(getListNameFromLocal(index))
  );
}

function updateActiveListToLocal() {
  const listItems = [];
  todoController.getActiveList().getAllItems().forEach(item => {
    listItems.push(item.getObject());
  });

  localStorage.setItem(
    todoController.getActiveList().getName(),
    JSON.stringify(listItems)
  );
}

export {
  saveListToLocal,
  isLocalStorageEmpty,
  getListNameFromLocal,
  getListItemsFromLocal,
  updateActiveListToLocal,
}