import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from './services/todo.service';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './todo-form.component';
import { TodoDetailComponent } from './todo-detail.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoDetailComponent]
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  selected: string | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.todoService.getTodos().subscribe(list => this.todos = list);
  }

  toggle(t: Todo) {
    this.todoService.updateTodo(t.id, { completed: !t.completed }).subscribe(() => this.refresh());
  }

  view(t: Todo) {
    this.selected = t.id;
  }

  edit(t: Todo) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.todoService.enableEditMode.next(structuredClone(t));
  }

  remove(t: Todo) {
    if (!confirm('Delete this todo?')) return;
    this.todoService.deleteTodo(t.id).subscribe(() => this.refresh());
  }

  onSaved() {
    localStorage.removeItem('edit-todo');
    this.refresh();
  }
}
