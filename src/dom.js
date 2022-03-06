import { updateTodo, getTodos } from "./api";

const notDone = document.querySelector('#not-done');
const done = document.querySelector('#done');

export function createTodo(todo) {
  return createStructure(todo.id, todo.title, todo.body, todo.dueDate, 'false');
}

export function createDone(todo) {
  return createStructure(todo.id, todo.title, todo.body, todo.dueDate, 'true');
}

export function renderTodos() {
  getTodos().then((todos) => {
    done.innerHTML = '';
    notDone.innerHTML = '';
    todos.forEach((todo) => {
      if (todo.done === "false") {
        notDone.appendChild(createTodo(todo));
      } else {
        done.appendChild(createDone(todo));
      }
    });
  });
}

function createStructure(id, name, body, dueDate, done) {
  const container = document.createElement('div');
  container.innerHTML = `
  <div class="d-inline-block card mb-2">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        Due date: ${getDate(dueDate)},
        <a href="#" class="card-link">${(done === 'true') ? '' : 'not '}done</a>
      </h6>
      <p class="card-text">${body}</p>
    </div>
  </div>
  `;
  const doneLink = container.querySelector('.card-link');
  doneLink.addEventListener('click', function() {
    updateTodo(id, { done: flip(done) }).then(() => {
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
