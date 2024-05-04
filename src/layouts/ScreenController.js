import { todoController } from '../components/TodoController.js';
import * as AddItemModal from './AddItemModal.js';

export function buildMainUI(contentDiv) {
  const list = document.createElement('div');
  list.classList.add('list');
  contentDiv.appendChild(list);

  const listContainer = document.createElement('div');
  listContainer.classList.add('list__container');
  list.appendChild(listContainer);

  const listHeader = buildHeader();
  listContainer.appendChild(listHeader);

  const listItems = buildListItems();
  listContainer.appendChild(listItems);
}

export function refreshMainUI() {
  const listContainer = document.querySelector('.list__container');
  listContainer.textContent = '';

  const listHeader = buildHeader();
  listContainer.appendChild(listHeader);

  const listItems = buildListItems();
  listContainer.appendChild(listItems);
}

function btnAddItemHandler() {
  AddItemModal.show();
}

function buildHeader() {
  const listHeader = document.createElement('div');
  listHeader.classList.add('list__header');
  
  const listName = document.createElement('h1');
  listName.textContent = todoController.getActiveList().getName();
  listName.classList.add('list__name');
  listHeader.appendChild(listName);
  
  const btnAddItem = document.createElement('button');
  btnAddItem.type = 'button';
  btnAddItem.textContent = 'Add task'
  btnAddItem.classList.add('button');
  btnAddItem.classList.add('button--primary');
  btnAddItem.classList.add('button--with-icon');
  btnAddItem.classList.add('list__button-add-item');
  btnAddItem.addEventListener('click', btnAddItemHandler);
  listHeader.appendChild(btnAddItem);
  
  const spanAddItem = document.createElement('span');
  spanAddItem.classList.add('las');
  spanAddItem.classList.add('la-plus');
  spanAddItem.classList.add('button__icon');
  btnAddItem.appendChild(spanAddItem);

  return listHeader;
}

function buildListItems() {
  const listItemsContainer = document.createElement('div');
  listItemsContainer.classList.add('list__items-container');

  todoController.getActiveList().getAllItems().forEach((item, itemIndex) => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item__container');

    const itemTitle = document.createElement('h2');
    itemTitle.classList.add('item__title');
    itemTitle.textContent = item.getTitle();
    itemContainer.appendChild(itemTitle);

    listItemsContainer.appendChild(itemContainer);
  });

  return listItemsContainer;
}