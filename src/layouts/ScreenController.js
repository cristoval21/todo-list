import { todoController } from '../components/TodoController.js';
import * as AddItemModal from'./AddItemModal.js';

export function buildMainUI() {
  document.body.textContent = '';

  const btnAddItem = document.createElement('button');
  btnAddItem.type = 'button';
  btnAddItem.classList.add('button');
  btnAddItem.classList.add('button-add-item');
  btnAddItem.textContent = 'Add Item';
  btnAddItem.addEventListener('click', btnAddItemHandler);
  document.body.appendChild(btnAddItem);

  const listsContainer = retrieveLists();
  document.body.appendChild(listsContainer);

  AddItemModal.buildModal(todoController.getAllLists());
}

function retrieveLists() {
  const listsContainer = document.createElement('div');
  listsContainer.classList.add('list-container');

  todoController.getAllLists().forEach((todoList, listIndex) => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
  
    const projectCardHeader = document.createElement('div');
    projectCardHeader.classList.add('project-card__header');
  
    const projectCardTitle = document.createElement('h2');
    projectCardTitle.classList.add('project-card__title');
    projectCardTitle.textContent = todoList.getName();
  
    const projectCardList = retrieveListItems(listIndex);
    
    projectCardHeader.appendChild(projectCardTitle);
    
    projectCard.appendChild(projectCardHeader);
    projectCard.appendChild(projectCardList);
    
    listsContainer.appendChild(projectCard);
  });
  
  return listsContainer;
}

function retrieveListItems(listIndex) {
  const projectCardList = document.createElement('ul');
  projectCardList.classList.add('project-card__list');

  todoController.getList(listIndex).getAllItems().forEach(item => {
    const projectCardListItem = document.createElement('li');
    projectCardListItem.classList.add('project-card__list-item');
    projectCardListItem.textContent = item.getTitle();

    projectCardList.appendChild(projectCardListItem);
  })

  return projectCardList;
}

function btnAddItemHandler() {
  AddItemModal.show();
}