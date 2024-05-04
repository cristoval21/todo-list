import { buildMainUI, refreshMainUI } from "./ScreenController";
import { todoController } from "../components/TodoController";

export function buildModal(lists) {
  const dialogAddItem = document.createElement('dialog');
  dialogAddItem.classList.add('dialog');
  dialogAddItem.classList.add('dialog-add-item__form');

  const form = document.createElement('form');
  form.classList.add('form');
  form.classList.add('dialog-add-item__form');

  // Title
  const fieldTitle = document.createElement('div');
  fieldTitle.classList.add('form__field');

  const labelTitle = document.createElement('label');
  labelTitle.setAttribute('for', 'item-title');
  labelTitle.textContent = 'Task title';

  const inputTitle = document.createElement('input');
  inputTitle.type = 'text';
  inputTitle.id = 'item-title';
  inputTitle.required = true;

  fieldTitle.appendChild(labelTitle);
  fieldTitle.appendChild(inputTitle);
  form.appendChild(fieldTitle);

  // Description
  const fieldDescription = document.createElement('div');
  fieldDescription.classList.add('form__field');

  const labelDescription = document.createElement('label');
  labelDescription.setAttribute('for', 'item-description');
  labelDescription.textContent = 'Task description';

  const inputDescription = document.createElement('input');
  inputDescription.type = 'text';
  inputDescription.id = 'item-description';

  fieldDescription.appendChild(labelDescription);
  fieldDescription.appendChild(inputDescription);
  form.appendChild(fieldDescription);

  // Due
  const fieldDue = document.createElement('div');
  fieldDue.classList.add('form__field');

  const labelDue = document.createElement('label');
  labelDue.setAttribute('for', 'item-due');
  labelDue.textContent = 'Due date'
  
  const inputDue = document.createElement('input');
  inputDue.type = 'date';
  inputDue.id = 'item-due';

  fieldDue.appendChild(labelDue);
  fieldDue.appendChild(inputDue);
  form.appendChild(fieldDue);

  // Button Add Item
  const btnAddItem = document.createElement('button');
  btnAddItem.type = 'submit';
  btnAddItem.textContent = 'Add item';
  btnAddItem.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      alert('Form is invalid');
    } else {
      btnAddItemHandler(
        inputTitle.value,
        inputDescription.value,
        inputDue.value,
      );
      form.reset();
    }
  });
  form.appendChild(btnAddItem);

  // Button Cancel
  const btnCancel = document.createElement('button');
  btnCancel.type = 'button';
  btnCancel.textContent = 'Cancel';
  btnCancel.addEventListener('click', close);
  form.appendChild(btnCancel);

  dialogAddItem.appendChild(form);
  document.body.appendChild(dialogAddItem);
}

export function show() {
  const dialogAddItem = document.querySelector('.dialog-add-item__form');
  dialogAddItem.showModal();
}

function close() {
  const dialogAddItem = document.querySelector('.dialog-add-item__form');
  dialogAddItem.close();
}

function btnAddItemHandler(title, description, dueDate) {
  todoController.addItemToActiveList(
    title,
    description,
    dueDate,
  )
  refreshMainUI();
  close();
}