const API_URL = `//${location.hostname}:1234/api`;

export async function getTodos() {
  const req = await fetch(`${API_URL}/todos`);
  return await req.json();
}

export async function getTodo(id) {
  const req = await fetch(`${API_URL}/todos/${id}`);
  return await req.json();
}

export async function deleteTodo(id) {
  const req = await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
  return await req.json();
}

export async function addTodo(title, todo, dueDate) {
  const body = new URLSearchParams();
  body.append('title', title);
  body.append('body', todo);
  body.append('dueDate', dueDate);
  body.append('done', false);
  const req = await fetch(`${API_URL}/todos`, { method: 'POST', body });
  return await req.json();
}

export async function updateTodo(id, params) {
  const body = new URLSearchParams();
  if (params.title) body.append('title', params.title);
  if (params.body) body.append('body', params.todo);
  if (params.done) body.append('done', params.done);
  if (params.dueDate) body.append('dueDate', params.dueDate);
  const req = await fetch(`${API_URL}/todos/${id}`, { method: 'PATCH', body });
  return await req.json();
}
