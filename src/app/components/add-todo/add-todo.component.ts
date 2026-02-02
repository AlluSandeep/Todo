import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
})
export class AddTodoComponent {
  title = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) {}

  saveTodo() {
    if (!this.title.trim()) return;

    const newTodo = {
      title: this.title,
      completed: false,
    };

    this.todoService.addTodo(newTodo).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
