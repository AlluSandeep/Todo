import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

export const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todos/:id', component: TodoDetailComponent },
  { path: 'todos/:id/edit', component: TodoEditComponent },
  { path: 'add', component: AddTodoComponent },
];
