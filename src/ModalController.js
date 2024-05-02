export function ModalController(listsName) {
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
  inputTitle.setAttribute('id', 'item-title');

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
  inputDescription.setAttribute('id', 'item-description');

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
  inputDue.type = 'text';
  inputDue.setAttribute('id', 'item-due');

  fieldDue.appendChild(labelDue);
  fieldDue.appendChild(inputDue);
  form.appendChild(fieldDue);

  // Priority
  const fieldPriority = document.createElement('div');
  fieldPriority.classList.add('form__field');

  const radioPriorityDefault = document.createElement('input');
  radioPriorityDefault.type = 'radio';
  radioPriorityDefault.name = 'item-priority';

  const labelPriorityDefault = document.createElement('label');
  labelPriorityDefault.setAttribute('for', 'item-priority-default');
  labelPriorityDefault.textContent = 'Default';

  const radioPriorityImportant = document.createElement('input');
  radioPriorityImportant.type = 'radio';
  radioPriorityImportant.name = 'item-priority';

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
  
  const selectLists = document.createElement('select');

  listsName.forEach(listName => {
    const select = document.createElement('select');
    select.setAttribute('')
  });
}