import { TodoItem } from './TodoItem.js';

export class TodoList {
  #_list = [];

  constructor(listName) {
    this._listName = listName;
  }

  getName() {
    return this._listName;
  }

  addItem(title, description, dueDate, starred, completed) {
    this.#_list.push(new TodoItem(title, description, dueDate, starred, completed));
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
    );
    oldList.removeItem(itemIndex);
  }
}