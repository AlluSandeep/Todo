import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    CommonModule, // ✅ ngClass, *ngIf
    RouterModule, // ✅ routerLink
  ],
  templateUrl: './todo-detail.component.html',
})
export class TodoDetailComponent implements OnInit {
  todo!: Todo;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.todoService.getTodoById(id).subscribe((data: Todo) => {
      this.todo = data;
    });
  }
}
