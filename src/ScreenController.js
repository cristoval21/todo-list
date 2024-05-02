import { TodoController } from './TodoController.js';
import { buildModal, show } from'./ModalController.js';

export function buildUI() {
  const todoController = TodoController();

  const btnAddItem = document.createElement('button');
  btnAddItem.type = 'button';
  btnAddItem.classList.add('button');
  btnAddItem.classList.add('project-card__button');
  btnAddItem.classList.add('project-card__button-add-item');
  btnAddItem.textContent = 'Add Item';
  btnAddItem.addEventListener('click', btnAddItemHandler);
  document.body.appendChild(btnAddItem);

  todoController.getAllLists().forEach(todoList => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
  
    const projectCardHeader = document.createElement('div');
    projectCardHeader.classList.add('project-card__header');
  
    const projectCardTitle = document.createElement('h2');
    projectCardTitle.classList.add('project-card__title');
    projectCardTitle.textContent = todoList.getName();
  
    const projectCardList = document.createElement('ul');
    projectCardList.classList.add('project-card__list');
  
    projectCardHeader.appendChild(projectCardTitle);
  
    projectCard.appendChild(projectCardHeader);
    projectCard.appendChild(projectCardList);
  
    document.body.appendChild(projectCard);
  });

  buildModal(todoController.getAllLists());
}

function btnAddItemHandler() {
  show();
}