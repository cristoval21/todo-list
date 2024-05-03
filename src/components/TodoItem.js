export class TodoItem {
  #_status = false;

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

  getStatus() {
    return this.#_status;
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

  toggleStatus() {
    this.#_status = !this.#_status;
  }
}