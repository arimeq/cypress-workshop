import { addTodo } from './api';
import { createTodo, renderTodos } from './dom';

const notDone = document.querySelector('#not-done');
const buttonAdd = document.querySelector('#button-add');
const createTodoForm = document.querySelector('#create-todo');

buttonAdd.addEventListener('click', () => {
  createTodoForm.classList.toggle('d-none');
});

createTodoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const form = event.target;
  addTodo(form.todoTitle.value, form.todoText.value, (new Date(form.todoDueDate.value)).toISOString())
    .then((todo) => {
      notDone.appendChild(createTodo(todo));
      form.classList.add('d-none');
      form.reset();
    });
});

renderTodos();
