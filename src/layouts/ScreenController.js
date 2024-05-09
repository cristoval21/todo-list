import { differenceInDays, formatDistance, formatDistanceStrict, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns';
import { todoController } from '../components/TodoController.js';
import * as AddItemModal from './AddItemModal.js';
import * as EditItemModal from './EditItemModal.js';
import { updateActiveListToLocal } from '../utilities/LocalStorage.js';

export function addMainUI(contentDiv) {
  // todoController.addItemToActiveList("test", "", "");
  // todoController.addItemToActiveList("test2", "testdesc2", "");
  // todoController.addItemToActiveList("test3", "testdesc3", "2024-05-09");
  // todoController.getActiveList().getItem(0).toggleStarred();
  // todoController.getActiveList().getItem(1).toggleCompleted();

  const list = document.createElement('div');
  list.classList.add('list');
  contentDiv.appendChild(list);

  const listContainer = document.createElement('div');
  listContainer.classList.add('list__container');
  list.appendChild(listContainer);

  if (todoController.hasLists()) {
    const listHeader = generateHeaderUI();
    listContainer.appendChild(listHeader);
  
    const listItems = generateListItemsUI();
    listContainer.appendChild(listItems);
  }
}

export function refreshMainUI() {
  const listContainer = document.querySelector('.list__container');
  listContainer.textContent = '';

  const listHeader = generateHeaderUI();
  listContainer.appendChild(listHeader);

  const listItems = generateListItemsUI();
  listContainer.appendChild(listItems);
}

function btnAddItemHandler() {
  AddItemModal.show();
}

function generateHeaderUI() {
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

function generateListItemsUI() {
  const listItemsContainer = document.createElement('div');
  listItemsContainer.classList.add('list__items-container');

  todoController.getActiveList().getAllItems().forEach((item, itemIndex) => {
    const title = item.getTitle();
    const description = item.getDescription();
    const hasDescription = item.getDescription();
    const hasDueDate = item.getDueDate();
    const isCompleted = item.getCompleted();
    const isStarred = item.getStarred();

    // Container
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item__container');
    itemContainer.classList.toggle('item__container--completed', isCompleted);
    itemContainer.classList.toggle('item__container--starred', isStarred);
    itemContainer.classList.toggle('item__container--no-description', !hasDescription);
    itemContainer.dataset.itemIndex = itemIndex;

    listItemsContainer.appendChild(itemContainer);

    // Item texts
    const itemTextContainer = document.createElement('div');
    itemTextContainer.classList.add('item__text-container');

    itemContainer.appendChild(itemTextContainer);

    // Title
    const itemTitle = document.createElement('div');
    itemTitle.classList.add('item__title');
    itemTitle.classList.toggle('item__title--completed', isCompleted);
    itemTitle.textContent = title;

    itemTextContainer.appendChild(itemTitle);

    // Description
    if (hasDescription) {
      const itemDescription = document.createElement('div');
      itemDescription.classList.add('item__description');
      itemDescription.textContent = description;
  
      itemTextContainer.appendChild(itemDescription);
    }

    // Actions
    const itemActionsContainer = document.createElement('div');
    itemActionsContainer.classList.add('item__actions-container');

    itemContainer.appendChild(itemActionsContainer);

    // Chip Due Date
    const chipDueDate = document.createElement('div');
    chipDueDate.classList.add('chip', 'item__chip', 'item__chip-due-date');
    chipDueDate.style.display = 'none';
    if (hasDueDate) {
      chipDueDate.style.display = 'unset';
      chipDueDate.textContent = generateDueDateMessage(item.getDueDate());
    }

    itemActionsContainer.appendChild(chipDueDate);

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
      itemContainer.classList.toggle('item__container--completed');
      updateActiveListToLocal();
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
      itemContainer.classList.toggle('item__container--starred');
      updateActiveListToLocal();
    });
    
    itemActionsContainer.appendChild(btnStarItem);

    // Delete Item
    const btnDeleteItem = document.createElement('button');
    btnDeleteItem.classList.add('button', 'button--tertiary', 'button--icon-only', 'material-symbols-rounded');
    btnDeleteItem.textContent = 'delete';
    btnDeleteItem.addEventListener('click', () => {
      todoController.getActiveList().removeItem(itemIndex);
      updateActiveListToLocal();
      refreshMainUI();
    })

    itemActionsContainer.appendChild(btnDeleteItem);

    // Edit Item
    const btnEditItem = document.createElement('button');
    btnEditItem.classList.add('button', 'button--tertiary', 'button--icon-only', 'material-symbols-rounded');
    btnEditItem.textContent = 'edit';
    btnEditItem.addEventListener('click', () => {
      EditItemModal.show(itemIndex);
    })

    itemActionsContainer.appendChild(btnEditItem);
  });

  return listItemsContainer;
}

function generateDueDateMessage(dueDate) {
  if (isYesterday(dueDate)) return 'yesterday';
  else if (isToday(dueDate)) return 'today';
  else if (isTomorrow(dueDate)) return 'tomorrow';
  else return formatDistanceStrict(new Date(dueDate), new Date(), {
    addSuffix: true,
    unit: 'day',
  });
}