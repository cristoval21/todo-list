import { todoController } from "../components/TodoController";
import { getActiveListIndex, setActiveListIndex } from "../utilities/ActiveListIndex";
import { refreshMainUI } from "./ScreenController";

export function addSidebar(contentDiv) {
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');
  
  const sidebarContainer = document.createElement('div');
  sidebarContainer.classList.add('sidebar__container');
  
  sidebar.appendChild(sidebarContainer);

  const sidebarListWrapper = document.createElement('div');
  sidebarListWrapper.classList.add('sidebar__list-wrapper');

  sidebarContainer.appendChild(sidebarListWrapper);
  
  if (todoController.hasLists()) {
    const sidebarList = retrieveListNames();
    sidebarListWrapper.appendChild(sidebarList);
  }

  const sidebarActions = document.createElement('div');
  sidebarActions.classList.add('sidebar__actions');

  sidebarContainer.appendChild(sidebarActions);

  const btnAddList = document.createElement('button');
  btnAddList.type = 'button';
  btnAddList.classList.add('button', 'button--tertiary', 'button--icon-only', 'sidebar__button-add-list', 'material-symbols-rounded');
  btnAddList.textContent = 'add';
  btnAddList.addEventListener('click', btnAddListHandler);

  sidebarActions.appendChild(btnAddList);

  const inputAddList = document.createElement('input');
  inputAddList.classList.add('input', 'sidebar__input-add-list');
  inputAddList.type = 'text';
  inputAddList.placeholder = 'List name';
  inputAddList.id = 'input-add-list';

  sidebarActions.appendChild(inputAddList);

  contentDiv.appendChild(sidebar);
}

function refreshSidebar() {
  const sidebarListWrapper = document.querySelector('.sidebar__list-wrapper');
  sidebarListWrapper.textContent = '';

  const sidebarList = retrieveListNames();
  sidebarListWrapper.appendChild(sidebarList);
}

function retrieveListNames() {
  const sidebarList = document.createElement('div');
  sidebarList.classList.add('sidebar__list');
  todoController.getAllLists().forEach((list, listIndex) => {
    const sidebarItem = document.createElement('div');
    sidebarItem.classList.add('sidebar__item');
    sidebarItem.dataset.listIndex = listIndex;
    sidebarItem.textContent = list.getName();

    if (listIndex === getActiveListIndex()) {
      sidebarItem.classList.add('sidebar__item--active');
    }

    sidebarItem.addEventListener('click', (e) => {
      setActiveItem(e);
      refreshMainUI();
    });

    sidebarList.appendChild(sidebarItem);
  });

  return sidebarList;
}

function setActiveItem(event) {
  const currentlyActive = document.querySelector('.sidebar__item--active');
  currentlyActive.classList.toggle('sidebar__item--active');

  event.target.classList.toggle('sidebar__item--active');

  setActiveListIndex(event.target.dataset.listIndex);
}

function btnAddListHandler() {
  const inputAddList = document.querySelector('.sidebar__input-add-list');

  if (inputAddList.value) {
    todoController.addList(inputAddList.value);

    // Save to localStorage
    localStorage.setItem(inputAddList.value, '');

    // Refresh UI
    refreshMainUI();
    refreshSidebar();
  }
}