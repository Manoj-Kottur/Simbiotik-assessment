import { TestBed } from '@angular/core/testing';
import { TodoDetailComponent } from './todo-detail.component';
import { TodoService } from './services/todo.service';
import { of } from 'rxjs';

class MockTodoService {
  getTodoById() { return of({ id: '1', title: 't', description: '', completed: false }); }
}

describe('TodoDetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: TodoService, useClass: MockTodoService }],
      imports: [TodoDetailComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoDetailComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should load todo when todoId set', () => {
    const fixture = TestBed.createComponent(TodoDetailComponent);
    const comp = fixture.componentInstance;
    comp.todoId = '1';
    fixture.detectChanges();
    expect(comp.todo).toBeTruthy();
  });
});
