import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TodoService, Todo } from './services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TodoFormComponent implements OnInit {
  @Output() saved = new EventEmitter<void>();
  model: Partial<Todo> = { title: '', description: '', completed: false };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.enableEditMode.subscribe((data) => {
      if (data) {
        this.model = data;
      }
    });
  }

  save() {
    if ((this.model as any).id) {
      this.todoService.updateTodo((this.model as any).id, this.model).subscribe(() => {
        this.saved.emit();
        this.clear();
      });
    } else {
      this.todoService.createTodo(this.model).subscribe(() => {
        this.saved.emit();
        this.clear();
      });
    }
  }

  clear() {
    this.model = { title: '', description: '', completed: false };
    localStorage.removeItem('edit-todo');
  }
}
