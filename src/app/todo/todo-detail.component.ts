import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TodoService, Todo } from './services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TodoDetailComponent implements OnInit {
  @Input() todoId!: string;
  @Output() close = new EventEmitter<void>();
  todo?: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    if (this.todoId) {
      this.todoService.getTodoById(this.todoId).subscribe(t => this.todo = t);
    }
  }
}
