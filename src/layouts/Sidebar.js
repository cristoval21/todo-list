import { todoController } from "../components/TodoController";

export let activeList = 0;

export function buildSidebar(contentDiv) {
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar');

  const sidebarContainer = document.createElement('div');
  sidebarContainer.classList.add('sidebar__container');

  sidebar.appendChild(sidebarContainer);
  
  const sidebarList = retrieveListNames();
  sidebarContainer.appendChild(sidebarList);

  const sidebarActions = document.createElement('div');
  sidebarActions.classList.add('sidebar__actions');

  sidebarContainer.appendChild(sidebarActions);

  const btnAddList = document.createElement('button');
  btnAddList.type = 'button';
  btnAddList.classList.add('sidebar__button-add-list');

  sidebarActions.appendChild(btnAddList);

  const btnIcon = document.createElement('span');
  btnIcon.classList.add('material-symbols-rounded');
  btnIcon.textContent = 'add';

  btnAddList.appendChild(btnIcon);

  const inputAddList = document.createElement('input');
  inputAddList.classList.add('sidebar__input-add-list');
  inputAddList.type = 'text';
  inputAddList.placeholder = 'List name';
  inputAddList.id = 'input-add-list';

  sidebarActions.appendChild(inputAddList);

  contentDiv.appendChild(sidebar);
}

function retrieveListNames() {
  const sidebarList = document.createElement('div');
  sidebarList.classList.add('sidebar__list');
  todoController.getAllLists().forEach((list, listIndex) => {
    const sidebarItem = document.createElement('div');
    sidebarItem.classList.add('sidebar__item');
    sidebarItem.dataset.listIndex = listIndex;
    sidebarItem.textContent = list.getName();

    if (listIndex === activeList) {
      sidebarItem.classList.add('sidebar__item--active');
    }

    sidebarItem.addEventListener('click', (e) => {
      setActiveItem(e);
    });

    sidebarList.appendChild(sidebarItem);
  });

  return sidebarList;
}

function setActiveItem(event) {
  const currentlyActive = document.querySelector('.sidebar__item--active');
  currentlyActive?.classList.toggle('sidebar__item--active');

  event.target.classList.toggle('sidebar__item--active');

  activeList = event.target.dataset.listIndex;
}