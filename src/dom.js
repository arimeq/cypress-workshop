import { updateTodo, getTodos, deleteTodo } from "./api";

const app = document.querySelector('#app');
const notDone = document.querySelector('#not-done');
const done = document.querySelector('#done');

export function createTodo(todo) {
  notDone.appendChild(createStructure(todo.id, todo.title, todo.body, todo.dueDate, 'false'));
}

export function createDone(todo) {
  done.appendChild(createStructure(todo.id, todo.title, todo.body, todo.dueDate, 'true'));
}

export function renderTodos() {
  app.classList.add('loading');
  getTodos().then((todos) => {
    done.innerHTML = '';
    notDone.innerHTML = '';
    todos.forEach((todo) => {
      if (todo.done === "false") {
        createTodo(todo);
      } else {
        createDone(todo);
      }
    });
    app.classList.remove('loading');
  });
}

function createStructure(id, name, body, dueDate, done) {
  const container = document.createElement('div');
  container.classList.add('d-inline-block', 'card', 'mb-2');
  container.innerHTML = `
    <div class="card-body">
      <button
        type="button" class="btn-close position-absolute top-0 end-0"
        aria-label="Close" data-test-id="button-close">
      </button>
      <h5 class="card-title" data-test-id="todo-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        Due date: ${getDate(dueDate)},
        <a href="#" class="card-link" data-test-id="todo-status-link">${(done === 'true') ? '' : 'not '}done</a>
      </h6>
      <p class="card-text" data-test-id="todo-body">${body}</p>
    </div>
  `;
  const doneLink = container.querySelector('.card-link');
  const closeBtn = container.querySelector('.btn-close');
  doneLink.addEventListener('click', function() {
    app.classList.add('loading');
    updateTodo(id, { done: flip(done) }).then(() => {
      renderTodos();
    });
  });
  closeBtn.addEventListener('click', function() {
    app.classList.add('loading');
    deleteTodo(id).then(() => {
      renderTodos();
    });
  });
  return container;
}

function getDate(date) {
  const options = { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" };
  if (date?.constructor.name === 'Date') {
    return date.toLocaleDateString(undefined, options);
  }
  const parsed = new Date(date);
  if (!isNaN(parsed.valueOf())) {
    return parsed.toLocaleDateString(undefined, options);
  }
  return `${date}`;
}

function flip(boolAsString) {
  return boolAsString === 'true' ? 'false' : 'true';
}
