export class TodoItem {
  #_starred = false;
  #_completed = false;

  constructor(title, description, dueDate) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
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

  getStarred() {
    return this.#_starred;
  }

  getCompleted() {
    return this.#_completed;
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

  toggleStarred() {
    this.#_starred = !this.#_starred;
  }

  toggleCompleted() {
    this.#_completed = !this.#_completed;
  }
}