const dialogAddItem = document.createElement('dialog');
dialogAddItem.classList.add('dialog');
dialogAddItem.classList.add('dialog-add-item__form');

export function buildModal(lists) {
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
  inputDescription.required = true;

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
  inputDue.required = true;

  fieldDue.appendChild(labelDue);
  fieldDue.appendChild(inputDue);
  form.appendChild(fieldDue);

  // Priority
  const fieldPriority = document.createElement('div');
  fieldPriority.classList.add('form__field');

  const radioPriorityDefault = document.createElement('input');
  radioPriorityDefault.type = 'radio';
  radioPriorityDefault.name = 'item-priority';
  radioPriorityDefault.id = 'item-priority-default';

  const labelPriorityDefault = document.createElement('label');
  labelPriorityDefault.setAttribute('for', 'item-priority-default');
  labelPriorityDefault.textContent = 'Default';

  const radioPriorityImportant = document.createElement('input');
  radioPriorityImportant.type = 'radio';
  radioPriorityImportant.name = 'item-priority';
  radioPriorityImportant.id = 'item-priority-important';

  const labelPriorityImportant = document.createElement('label');
  labelPriorityImportant.setAttribute('for', 'item-priority-important');
  labelPriorityImportant.textContent = 'Important';

  fieldPriority.appendChild(radioPriorityDefault);
  fieldPriority.appendChild(labelPriorityDefault);
  fieldPriority.appendChild(radioPriorityImportant);
  fieldPriority.appendChild(labelPriorityImportant);
  form.appendChild(fieldPriority);

  // Lists
  const fieldLists = document.createElement('div');
  fieldLists.classList.add('form__field');

  const labelLists = document.createElement('label');
  labelLists.setAttribute('for', 'item-lists');
  labelLists.textContent = 'Select project';
  
  const selectLists = document.createElement('select');
  selectLists.id = 'item-lists';

  lists.forEach(list => {
    const listName = list.getName();
    const optionLists = document.createElement('option');
    optionLists.textContent = listName;

    selectLists.appendChild(optionLists);
  });

  fieldLists.appendChild(labelLists);
  fieldLists.appendChild(selectLists);
  form.appendChild(fieldLists);

  // Button Add Item
  const btnAddItem = document.createElement('button');
  btnAddItem.type = 'submit';
  btnAddItem.textContent = 'Add item';
  btnAddItem.addEventListener('click', btnAddItemHandler);
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
  dialogAddItem.showModal();
}

function close() {
  dialogAddItem.close();
}

function btnAddItemHandler(e) {
  e.preventDefault();
  console.log("item added");
  close();
}