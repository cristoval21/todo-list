import './style.css';
import { TodoController } from './TodoController.js';

const refreshScreen = document.querySelector('#refresh-scren');
const todoController = new TodoController();

const btnAddItem = document.createElement('button');
btnAddItem.type = 'button';
btnAddItem.classList.add('button');
btnAddItem.classList.add('project-card__button');
btnAddItem.classList.add('project-card__button-add-item');
btnAddItem.textContent = 'Add Item';
btnAddItem.addEventListener('click', btnAddItemHandler);

todoController.getAllLists().forEach(todoList => {
  const projectCard = document.createElement('div');
  projectCard.classList.add('project-card');

  const projectCardHeader = document.createElement('div');
  projectCardHeader.classList.add('project-card__header');

  const projectCardTitle = document.createElement('h2');
  projectCardTitle.classList.add('project-card__title');
  projectCardTitle.textContent = todoList.getListName();

  const projectCardList = document.createElement('ul');
  projectCardList.classList.add('project-card__list');

  projectCardHeader.appendChild(projectCardTitle);
  projectCardHeader.appendChild(btnAddItem);

  projectCard.appendChild(projectCardHeader);
  projectCard.appendChild(projectCardList);

  document.body.appendChild(projectCard);
});

function btnAddItemHandler() {
  console.log('clicked');
}

const dialog = document.querySelector('.dialog-add-item');
dialog.showModal();