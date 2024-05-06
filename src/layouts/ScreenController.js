import { todoController } from '../components/TodoController.js';
import * as AddItemModal from './AddItemModal.js';

export function buildMainUI(contentDiv) {
  todoController.addItemToActiveList("test", "", "");
  todoController.addItemToActiveList("test2", "testdesc2", "");
  todoController.addItemToActiveList("test3", "testdesc3", "2024-05-07");
  todoController.getActiveList().getItem(0).toggleStarred();
  todoController.getActiveList().getItem(1).toggleCompleted();
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
  btnAddItem.classList.add('button', 'button--primary', 'button--with-icon', 'list__button-add-item');
  btnAddItem.addEventListener('click', btnAddItemHandler);
  listHeader.appendChild(btnAddItem);
  
  const spanAddItem = document.createElement('span');
  spanAddItem.classList.add('button__icon', 'material-symbols-rounded');
  spanAddItem.textContent = 'add';
  btnAddItem.appendChild(spanAddItem);

  return listHeader;
}

function buildListItems() {
  const listItemsContainer = document.createElement('div');
  listItemsContainer.classList.add('list__items-container');

  todoController.getActiveList().getAllItems().forEach((item, itemIndex) => {
    const title = item.getTitle();
    const isCompleted = item.getCompleted();
    const isStarred = item.getStarred();

    // Container
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item__container');
    itemContainer.dataset.itemIndex = itemIndex;

    listItemsContainer.appendChild(itemContainer);

    // Title
    const itemTitle = document.createElement('div');
    itemTitle.classList.add('item__title');
    itemTitle.classList.toggle('item__title--completed', isCompleted);
    itemTitle.textContent = title;
    // itemTitle.addEventListener('focusout', () => {
    //   validateNewTitle(itemTitle, item, title);
    // });
    // itemTitle.addEventListener('keypress', (e) => {
    //   if (e.key === 'Enter') {
    //     validateNewTitle(itemTitle, item, title);
    //     document.activeElement.blur();
    //   }
    // });

    itemContainer.appendChild(itemTitle);

    // Actions
    const itemActionsContainer = document.createElement('div');
    itemActionsContainer.classList.add('item__actions-container');

    itemContainer.appendChild(itemActionsContainer);

    // Button Completed
    const btnCompleted = document.createElement('button');
    btnCompleted.classList.add('button', 'button--tertiary', 'button--icon-only', 'material-symbols-rounded');
    btnCompleted.classList.toggle('item__button--colored', isCompleted);
    btnCompleted.classList.toggle('material-symbols-rounded--filled', isCompleted);
    btnCompleted.textContent = 'check_circle';
    btnCompleted.addEventListener('click', (e) => {
      item.toggleCompleted();
      btnCompleted.classList.toggle('material-symbols-rounded--filled');
      btnCompleted.classList.toggle('item__button--colored');
      itemTitle.classList.toggle('item__title--completed');
    })

    itemActionsContainer.appendChild(btnCompleted);
    
    // Star Item
    const btnStarItem = document.createElement('button');
    btnStarItem.classList.add('button', 'button--tertiary', 'button--icon-only', 'material-symbols-rounded');
    btnStarItem.classList.toggle('item__button--colored', isStarred);
    btnStarItem.classList.toggle('material-symbols-rounded--filled', isStarred);
    btnStarItem.textContent = 'star';
    btnStarItem.addEventListener('click', () => {
      item.toggleStarred();
      btnStarItem.classList.toggle('material-symbols-rounded--filled');
      btnStarItem.classList.toggle('item__button--colored');
    });
    
    itemActionsContainer.appendChild(btnStarItem);

    // Edit Item
    const btnEditItem = document.createElement('button');
    btnEditItem.classList.add('button', 'button--tertiary', 'button--icon-only', 'material-symbols-rounded');
    btnEditItem.textContent = 'edit';

    itemActionsContainer.appendChild(btnEditItem);
  });

  return listItemsContainer;
}

function validateNewTitle(itemTitle, item, title) {
  if (itemTitle.value) {
    item.setTitle(itemTitle.value);
  } else {
    itemTitle.value = title;
  }
}
