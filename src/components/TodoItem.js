export class TodoItem {
  #_starred = false;
  #_completed = false;

  constructor(title, description, dueDate, starred, completed) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this.#_starred = starred;
    this.#_completed = completed;
  }

  getObject() {
    return {
      title: this._title,
      description: this._description,
      dueDate: this._dueDate,
      starred: this.#_starred,
      completed: this.#_completed,
    };
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