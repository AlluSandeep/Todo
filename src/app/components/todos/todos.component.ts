import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  // pagination variables
  page: number = 1;
  limit: number = 10;
  totalCount: number = 0;
  searchText = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService
      .searchTodos(this.searchText, this.page, this.limit)
      .subscribe((response) => {
        this.todos = response.body || [];
        this.totalCount = Number(response.headers.get('X-Total-Count'));
      });
  }
  // ✅ total pages calculation
  get totalPages(): number {
    return Math.ceil(this.totalCount / this.limit);
  }

  viewTodo(id: number) {
    this.router.navigate(['/todo', id]);
  }

  editTodo(id: number) {
    this.router.navigate(['/todos', id, 'edit']);
  }

  deleteTodo(id: number) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe(() => {
        this.getAllTodos(); // refresh list
      });
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllTodos();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllTodos();
    }
  }

  onSearchChange() {
    this.page = 1; // search start ayithe page reset
    this.getAllTodos();
  }
}
