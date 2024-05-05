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
    const hasDescription = (item.getDescription()) ? true : false;
    const isCompleted = item.getCompleted();
    const isStarred = item.getStarred();

    // Container
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item__container');
    itemContainer.dataset.itemIndex = itemIndex;

    listItemsContainer.appendChild(itemContainer);

    // Completed
    const itemCompleted = document.createElement('input');
    itemCompleted.type = 'checkbox';
    itemCompleted.classList.add('item__completed');
    itemCompleted.checked = isCompleted;
    
    itemContainer.appendChild(itemCompleted);

    // Item Input Container
    const itemInputContainer = document.createElement('div');
    itemInputContainer.classList.add('item__input-container');

    itemContainer.appendChild(itemInputContainer);
    
    // Title
    const itemTitle = document.createElement('input');
    itemTitle.classList.add('input');
    itemTitle.classList.add('item__input');
    itemTitle.classList.toggle('item__input--completed', isCompleted);
    itemTitle.value = item.getTitle();
    itemTitle.addEventListener('focusout', () => {
      if (itemTitle.value) {
        item.setTitle(itemTitle.value);
      } else {
        itemTitle.value = item.getTitle();
      }
    });
    itemTitle.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (itemTitle.value) {
          item.setTitle(itemTitle.value);
        } else {
          itemTitle.value = item.getTitle();
        }
        document.activeElement.blur();
      }
    });

    itemInputContainer.appendChild(itemTitle);

    // Description
    // const itemDescription = document.createElement('input');
    // itemDescription.classList.add('input');
    // itemDescription.classList.add('input--textarea');
    // itemDescription.classList.add('item__input');
    // itemDescription.type = 'textarea';
    // itemDescription.value = item.getDescription();

    // itemInputContainer.appendChild(itemDescription);

    // Actions
    const itemActionsContainer = document.createElement('div');
    itemActionsContainer.classList.add('item__actions-container');

    itemContainer.appendChild(itemActionsContainer);

    // Due Date
    const itemDueDate = document.createElement('input');
    itemDueDate.classList.add('input');
    itemDueDate.classList.add('item__input');
    itemDueDate.classList.add('item__due-date');
    itemDueDate.type = 'date';
    itemDueDate.value = item.getDueDate();

    itemActionsContainer.appendChild(itemDueDate);

    // Item Star
    const btnItemStar = document.createElement('button');
    btnItemStar.classList.add('button');
    btnItemStar.classList.add('button--tertiary');
    btnItemStar.classList.add('button--icon');
    btnItemStar.classList.add('item__button-star');
    btnItemStar.classList.toggle('item__button-star--starred', isStarred);
    btnItemStar.classList.toggle('las', isStarred);
    btnItemStar.classList.toggle('lar', !isStarred);
    btnItemStar.classList.add('la-star');
    btnItemStar.addEventListener('click', () => {
      item.toggleStarred();
      btnItemStar.classList.toggle('item__button-star--starred');
      btnItemStar.classList.toggle('las');
      btnItemStar.classList.toggle('lar');
    });

    itemActionsContainer.appendChild(btnItemStar);

    itemCompleted.addEventListener('change', () => {
      item.toggleCompleted();
      itemTitle.classList.toggle('item__title--completed');
    });
  });

  return listItemsContainer;
}