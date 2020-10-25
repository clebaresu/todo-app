import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

enum VisibilityFilter {
  SHOW_ALL = 'All',
  SHOW_ACTIVE = 'Active',
  SHOW_COMPLETED = 'Completed'
}

class Todo {
  constructor(
    //public id: string,
    public task: string,
    public complete: boolean = false
  ) {}
}

class TodoApp extends LitElement {
  public todos: Todo[] = [];
  public task: string;
  public filter: VisibilityFilter = VisibilityFilter.SHOW_ALL

  constructor() {
    super();
    //this.todos = this.todos
    this.task = ''
    //this.filter = VisibilityFilters.SHOW_ALL;


  }
  render() {
    return html`
    <div class="input-layout"
      @keyup="${this.shortcutListener}">

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

    <div class="todos-list">
      ${this.todos.map(
          todo => html`
            <div class="todo-item">
              <vaadin-checkbox
                ?checked="${todo.complete}"
                @change="${
                    (e: { target: HTMLInputElement }) =>
                      this.updateTodoStatus(todo, e.target.checked)
                  }">
                ${todo.task}
              </vaadin-checkbox>
            </div>
          `
        )
      }
    </div>

    <vaadin-radio-group
      class="visibility-filters"
      value="${this.filter}"
      @value-changed="${this.filterChanged}"
    >
      ${
        Object.values(VisibilityFilter).map(
          filter => html`
            <vaadin-radio-button value="${filter}"
              >${filter}</vaadin-radio-button
            >
          `
        )
      }
    </vaadin-radio-group>
    <vaadin-button @click="${this.clearCompleted}">
      Clear Completed
    </vaadin-button>


    `;
  }

  addTodo() {
    if (this.task) {
      this.todos = [...this.todos, {
          task: this.task,
          complete: false
      }];
      this.task = '';
    }
  }

  shortcutListener(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  updateTask(e: { target: HTMLInputElement }) {
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo: Todo,complete: boolean) {
    this.todos = this.todos.map(todo =>
      updatedTodo === todo ? { ...updatedTodo, complete } : todo
    );
  }

  filterChanged(e: { detail: { value: VisibilityFilter } }) {
    this.filter = e.detail.value;
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.complete);
  }

  applyFilter() {
    switch (this.filter) {
      case VisibilityFilter.SHOW_ACTIVE:
        return this.todos.filter(todo => !todo.complete);
      case VisibilityFilter.SHOW_COMPLETED:
        return this.todos.filter(todo => todo.complete);
      default:
        return this.todos;
    }
  }

}

customElements.define('todo-app', TodoApp); //

