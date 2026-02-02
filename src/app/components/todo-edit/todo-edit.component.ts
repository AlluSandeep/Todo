import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ VERY IMPORTANT
  ],
  templateUrl: './todo-edit.component.html',
})
export class TodoEditComponent implements OnInit {
  todo!: Todo;
  successMsg = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.todoService.getTodoById(id).subscribe((data: Todo) => {
      this.todo = data;
    });
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo.id!, this.todo).subscribe(() => {
      this.successMsg = 'Todo updated successfully ✅';

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1500);
    });
  }
}
