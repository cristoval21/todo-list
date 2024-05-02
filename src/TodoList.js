import { TodoItem } from './TodoItem.js';

export class TodoList {
  #_list = [];

  constructor(listName) {
    this._listName = listName;
  }

  getListName() {
    return this._listName;
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