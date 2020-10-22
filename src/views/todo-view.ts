import { LitElement, html } from 'lit-element';

export class TodoApp extends LitElement {
  render() {
    return html` <p>todo-view</p> `;
  }
}
customElements.define('todo-app', TodoApp); //
