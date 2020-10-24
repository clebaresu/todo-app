import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

const VisibilityFilters = {     // (1)
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

class TodoApp extends LitElement {
  todos: never[];
  filter: string;
  task: string;

  constructor() {
    super();
    this.todos = [];
    this.filter = VisibilityFilters.SHOW_ALL;
    this.task = '';
  }
  render() {
    return html`
      <div class="input-layout"
      @keyup="${this.shortcutListener()}">

      <vaadin-text-field
        placeholder="Tarea"
        value="${this.task}"
        @change="${this.updateTask}">
      </vaadin-text-field>

      <vaadin-button
        theme="primary"
        @click="${this.addTodo}">
          Add Todo
      </vaadin-button>
    </div>

    `;
  }

  addTodo() {
    /*
    if (this.task) {
      this.todos = [...this.todos, {  // (1)
          task: this.task,
          complete: this.complete = false
      }];
      this.task = '';   // (2)
    }
    */
  }

  shortcutListener(e: {KeyboardEvent)} {
    /*
    if (e.key === 'Enter') {      // (3)
      this.addTodo();
    }
    */
  }

  updateTask(e) {  //4)
    this.task = e.target.value;
  }

   /*
  updateTodoStatus(updatedTodo,complete) {
    this.todos = this.todos.map(todo =>
      updatedTodo === todo ? { ...updatedTodo, complete } : todo
    );
  }
  */


}

customElements.define('todo-app', TodoApp); //

