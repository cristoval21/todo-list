import './style.css';

class TodoItem {
  constructor(title, description, dueDate, priority) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
  }

  getTitle() { 
    return this._title;
  }

  getDescription() {
    return this._description;
  }

  getDueDate() {
    return this._dueDate;
  }

  getPriority() {
    return this._priority;
  }

  setTitle(newTitle) {
    this._title = newTitle;
  }

  setDescription(newDescription) {
    this._description = newDescription;
  }

  setDueDate(newDate) {
    this._dueDate = newDate;
  }

  setPriority(newPriority) {
    this._priority = newPriority;
  }
}

class TodoList {
  #_list = [];

  constructor(listName) {
    this._listName = listName;
  }

  addItem(title, description, dueDate, priority) {
    this.#_list.push(new TodoItem(title, description, dueDate, priority));
  }

  removeItem(itemIndex) {
    this.#_list.splice(itemIndex, 1);
  }

  removeAllItems() {
    this.#_list.slice(0, this.#_list.length);
  }

  getItem(itemIndex) {
    return this.#_list[itemIndex];
  }

  getAllItems() {
    return this.#_list;
  }

  static moveItem(itemIndex, oldList, newList) {
    const item = oldList.getItem(itemIndex);
    newList.addItem(
      item.getTitle(),
      item.getDescription(),
      item.getDueDate(),
      item.getPriority()
    );
    oldList.removeItem(itemIndex);
  }
}

function TodoController() {
  let lists = [
    new TodoList('Default')
  ];

  function addItem(title, description, dueDate, priority, listIndex = 0) {
    lists[listIndex].addItem(title, description, dueDate, priority);
  }

  function getList(listIndex = 0) {
    return lists[listIndex];
  }

  function getAllLists() {
    return lists;
  }

  return {
    addItem,
    getList,
    getAllLists,
  };
}

const todo = TodoController();
todo.addItem('Get notebook', 'Get notebook from office', '20240-06-30', 'Default');
console.log( todo.getAllLists() );