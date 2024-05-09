import { refreshMainUI } from './ScreenController';
import { todoController } from '../components/TodoController';
import { format } from 'date-fns';
import { updateActiveListToLocal } from '../utilities/LocalStorage';

let currentItem = null;

export function addModal() {
  const dialogEditItem = document.createElement('dialog');
  dialogEditItem.classList.add('dialog', 'dialog-edit-item');

  const form = document.createElement('form');
  form.classList.add('form', 'dialog-edit-item__form');

  // Title
  const fieldTitle = document.createElement('div');
  fieldTitle.classList.add('form__field');

  const labelTitle = document.createElement('label');
  labelTitle.classList.add('form__label');
  labelTitle.setAttribute('for', 'dialog-edit-item__item-title');
  labelTitle.textContent = 'Task title';

  const inputTitle = document.createElement('input');
  inputTitle.classList.add('input', 'form__input', 'form__input-title');
  inputTitle.type = 'text';
  inputTitle.id = 'dialog-edit-item__item-title';
  inputTitle.required = true;
  inputTitle.addEventListener('focusout', (e) => {
    if (isTitleValid(e.target.value)) {
      e.target.classList.remove('form__input--invalid');
    } else {
      e.target.classList.add('form__input--invalid');
    }
  });

  fieldTitle.appendChild(labelTitle);
  fieldTitle.appendChild(inputTitle);
  form.appendChild(fieldTitle);

  // Description
  const fieldDescription = document.createElement('div');
  fieldDescription.classList.add('form__field');

  const labelDescription = document.createElement('label');
  labelDescription.classList.add('form__label');
  labelDescription.setAttribute('for', 'dialog-edit-item__item-description');
  labelDescription.textContent = 'Task description';

  const inputDescription = document.createElement('textarea');
  inputDescription.classList.add('input', 'input--textarea', 'form__input', 'form__input-description', 'form__input--textarea');
  inputDescription.id = 'dialog-edit-item__item-description';

  fieldDescription.appendChild(labelDescription);
  fieldDescription.appendChild(inputDescription);
  form.appendChild(fieldDescription);

  // Due Date
  const fieldDueDate = document.createElement('div');
  fieldDueDate.classList.add('form__field');

  const labelDueDate = document.createElement('label');
  labelDueDate.classList.add('form__label');
  labelDueDate.setAttribute('for', 'dialog-edit-item__item-due');
  labelDueDate.textContent = 'Due date'
  
  const inputDueDate = document.createElement('input');
  inputDueDate.classList.add('input', 'input--date', 'form__input', 'form__input-due-date', 'form__input--date');
  inputDueDate.min = format(new Date(), 'yyyy-MM-dd');
  inputDueDate.type = 'date';
  inputDueDate.id = 'dialog-edit-item__item-due';

  fieldDueDate.appendChild(labelDueDate);
  fieldDueDate.appendChild(inputDueDate);
  form.appendChild(fieldDueDate);

  // Actions
  const formActions = document.createElement('div');
  formActions.classList.add('form__actions');
  form.appendChild(formActions);

  // Button Edit
  const btnEditItem = document.createElement('button');
  btnEditItem.classList.add('button', 'button--primary', 'form__button');
  btnEditItem.type = 'submit';
  btnEditItem.textContent = 'Edit';
  btnEditItem.addEventListener('click', (e) => {
    e.preventDefault();
    if (isTitleValid(inputTitle.value)) {
      btnEditItemHandler(
        inputTitle.value,
        inputDescription.value,
        inputDueDate.value,
      );
      form.reset();
    }
  });
  formActions.appendChild(btnEditItem);

  // Button Cancel
  const btnCancel = document.createElement('button');
  btnCancel.classList.add('button', 'button--tertiary', 'form__button');
  btnCancel.type = 'button';
  btnCancel.textContent = 'Cancel';
  btnCancel.addEventListener('click', () => {
    btnCancelHandler();
    form.reset();
  });
  formActions.appendChild(btnCancel);

  dialogEditItem.appendChild(form);
  document.body.appendChild(dialogEditItem);
}

export function show(itemIndex) {
  const dialogEditItem = document.querySelector('.dialog-edit-item');
  dialogEditItem.showModal();
  fillDialog(itemIndex);
}

function btnCancelHandler() {
  const dialogEditItem = document.querySelector('.dialog-edit-item');
  dialogEditItem.close();
}

function btnEditItemHandler(newTitle, newDescription, newDueDate) {
  const currentTitle = currentItem.getTitle();
  const currentDescription = currentItem.getDescription();
  const currentDueDate = currentItem.getDueDate();

  if (newTitle != currentTitle) currentItem.setTitle(newTitle);
  if (newDescription != currentDescription) currentItem.setDescription(newDescription);
  if (newDueDate != currentDueDate) currentItem.setDueDate(newDueDate);

  updateActiveListToLocal();
  refreshMainUI();
  btnCancelHandler();
}

function isTitleValid(title) {
  return Boolean(title);
}

function fillDialog(itemIndex) {
  currentItem = todoController.getActiveList().getItem(itemIndex);

  const inputTitle = document.querySelector('#dialog-edit-item__item-title');
  inputTitle.value = currentItem.getTitle();

  const inputDescription = document.querySelector('#dialog-edit-item__item-description');
  inputDescription.value = currentItem.getDescription();

  const inputDueDate = document.querySelector('#dialog-edit-item__item-due');
  inputDueDate.value = currentItem.getDueDate();
}