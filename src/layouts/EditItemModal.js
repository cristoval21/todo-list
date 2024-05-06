import { refreshMainUI } from "./ScreenController";
import { todoController } from "../components/TodoController";
import { format, isPast } from "date-fns";

export function buildModal() {
  const dialogEditItem = document.createElement('dialog');
  dialogEditItem.classList.add('dialog');
  dialogEditItem.classList.add('dialog-edit-item');

  const form = document.createElement('form');
  form.classList.add('form');
  form.classList.add('dialog-edit-item__form');

  // Header
  const formHeader = document.createElement('div');
  formHeader.classList.add('form__header');

  const formHeading = document.createElement('h2');
  formHeading.classList.add('form__heading');
  formHeading.textContent = 'Edit task';

  formHeader.appendChild(formHeading);
  form.appendChild(formHeader);

  // Title
  const fieldTitle = document.createElement('div');
  fieldTitle.classList.add('form__field');

  const labelTitle = document.createElement('label');
  labelTitle.classList.add('form__label');
  labelTitle.setAttribute('for', 'item-title');
  labelTitle.textContent = 'Task title';

  const inputTitle = document.createElement('input');
  inputTitle.classList.add('input');
  inputTitle.classList.add('form__input');
  inputTitle.classList.add('form__input-title');
  inputTitle.type = 'text';
  inputTitle.id = 'item-title';
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
  labelDescription.setAttribute('for', 'item-description');
  labelDescription.textContent = 'Task description';

  const inputDescription = document.createElement('textarea');
  inputDescription.classList.add('input');
  inputDescription.classList.add('input--textarea');
  inputDescription.classList.add('form__input');
  inputDescription.classList.add('form__input-description');
  inputDescription.classList.add('form__input--textarea');
  inputDescription.id = 'item-description';

  fieldDescription.appendChild(labelDescription);
  fieldDescription.appendChild(inputDescription);
  form.appendChild(fieldDescription);

  // Due Date
  const fieldDueDate = document.createElement('div');
  fieldDueDate.classList.add('form__field');

  const labelDueDate = document.createElement('label');
  labelDueDate.classList.add('form__label');
  labelDueDate.setAttribute('for', 'item-due');
  labelDueDate.textContent = 'Due date'
  
  const inputDueDate = document.createElement('input');
  inputDueDate.classList.add('input');
  inputDueDate.classList.add('input--date');
  inputDueDate.classList.add('form__input');
  inputDueDate.classList.add('form__input-due-date');
  inputDueDate.classList.add('form__input--date');
  inputDueDate.min = format(new Date(), 'yyyy-MM-dd');
  inputDueDate.type = 'date';
  inputDueDate.id = 'item-due';
  inputDueDate.addEventListener('focusout', (e) => {
    if (isDueDateValid(e.target.value)) {
      e.target.classList.remove('form__input--invalid');
    } else {
      e.target.classList.add('form__input--invalid');
    }
  })

  fieldDueDate.appendChild(labelDueDate);
  fieldDueDate.appendChild(inputDueDate);
  form.appendChild(fieldDueDate);

  // Actions
  const formActions = document.createElement('div');
  formActions.classList.add('form__actions');
  form.appendChild(formActions);

  // Button Edit Item
  const btnEditItem = document.createElement('button');
  btnEditItem.classList.add('button');
  btnEditItem.classList.add('button--primary');
  btnEditItem.classList.add('form__button');
  btnEditItem.type = 'submit';
  btnEditItem.textContent = 'Edit';
  btnEditItem.addEventListener('click', (e) => {
    e.preventDefault();
    if (isTitleValid(inputTitle.value) && isDueDateValid(inputDueDate.value)) {
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
  btnCancel.classList.add('button');
  btnCancel.classList.add('button--tertiary');
  btnCancel.classList.add('form__button');
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

export function show() {
  const dialogEditItem = document.querySelector('.dialog-edit-item');
  dialogEditItem.showModal();
}

function btnCancelHandler() {
  const dialogEditItem = document.querySelector('.dialog-edit-item');
  dialogEditItem.close();
}

function btnEditItemHandler(title, description, dueDate) {
  todoController.addItemToActiveList(
    title,
    description,
    dueDate,
  )
  refreshMainUI();
  btnCancelHandler();
}

function isTitleValid(title) {
  return Boolean(title);
}

function isDueDateValid(dateString) {
  return !isPast(dateString);
}