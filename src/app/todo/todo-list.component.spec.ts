import { TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from './services/todo.service';
import { of } from 'rxjs';

class MockTodoService {
  getTodos() { return of([{ id: '1', title: 'T1', description: '', completed: false }]); }
}

describe('TodoListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: TodoService, useClass: MockTodoService }],
      imports: [TodoListComponent, RouterTestingModule]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should fetch todos on init and render a row', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    // there should be at least one table row in the body
    expect(el.querySelectorAll('tbody tr').length).toBeGreaterThan(0);
  });
});
