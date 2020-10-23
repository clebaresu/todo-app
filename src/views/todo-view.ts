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
  todos: unknown[];
  filter: string;
  task: string;
  todo: string;
  complete: boolean | undefined;


  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    };
  }
  constructor() {
    super();
    this.todos = [];
    this.filter = VisibilityFilters.SHOW_ALL;
    this.task = '';
    this.todo = '';
  }
  render() {
    return html`
      <div class="input-layout"
      @keyup="${this.shortcutListener}">

      <vaadin-text-field
        placeholder="Task"
        value="${this.task}"
        @change="${this.updateTask}">
      </vaadin-text-field>

      <vaadin-button
        theme="primary"
        @click="${this.addTodo}">
          Add Todo
      </vaadin-button>
    </div>

    <div class="todos-list">
      ${this.todos.map(
          todo => html`
            <div class="todo-item">
              <vaadin-checkbox
                ?checked="${this.complete}"
                @change="${ (e: { target: { checked: unknown } }) => this.updateTodoStatus(todo, e.target.checked)}">
                ${this.task}
              </vaadin-checkbox>
            </div>
          `
        )
      }
    </div>

    <div class="todos-list">
      ${this.todos.map(
          todo => html`
            <div class="todo-item">
              <vaadin-checkbox
                ?checked="${this.complete}"
                @change="${ (e: { target: { checked: unknown } }) => this.updateTodoStatus(todo, e.target.checked)}">
                ${this.task}
              </vaadin-checkbox>
            </div>
          `
        )
      }
    </div>

    `;
  }

  addTodo() {
    if (this.task) {
      this.todos = [...this.todos, {  // (1)
          task: this.task,
          complete: this.complete = false
      }];
      this.task = '';   // (2)
    }
  }

  shortcutListener(e: { key: string }) {
    if (e.key === 'Enter') {      // (3)
      this.addTodo();
    }
  }

  updateTask(e: { target: { value: string } }) {  //4)
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo: unknown, complete: unknown) {
    this.todos = this.todos.map(todo =>
      updatedTodo === todo ? { ...updatedTodo, complete } : todo
    );
  }

}

customElements.define('todo-app', TodoApp); //

