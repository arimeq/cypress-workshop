import './styles.css';
import { addTodo } from './api';
import { createTodo, renderTodos } from './dom';

const app = document.querySelector('#app');
const buttonAdd = document.querySelector('#button-add');
const createTodoForm = document.querySelector('#create-todo');

buttonAdd.addEventListener('click', () => {
  createTodoForm.classList.toggle('d-none');
});

createTodoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;
  app.classList.add('loading');
  addTodo(form.todoTitle.value, form.todoText.value, (new Date(form.todoDueDate.value)).toISOString())
    .then((todo) => {
      createTodo(todo);
      form.classList.add('d-none');
      form.reset();
      app.classList.remove('loading');
    });
});

renderTodos();
