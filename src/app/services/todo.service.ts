import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTodos(page: number, limit: number): Observable<HttpResponse<Todo[]>> {
    return this.http.get<Todo[]>(
      `${this.baseUrl}/todos?_page=${page}&_limit=${limit}`,
      { observe: 'response' },
    );
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/todos/${id}`);
  }

  addTodo(todo: any) {
    return this.http.post(`${this.baseUrl}/todos`, todo);
  }

  updateTodo(id: number, data: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseUrl}/todos/${id}`, data);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }

  searchTodos(searchText: string, page: number, limit: number) {
    let url = `${this.baseUrl}/todos?_page=${page}&_limit=${limit}`;

    if (searchText) {
      url += `&title_like=${searchText}`;
    }

    return this.http.get<any[]>(url, {
      observe: 'response',
    });
  }
}
