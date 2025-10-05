import { TestBed } from '@angular/core/testing';
import { TodoFormComponent } from './todo-form.component';
import { TodoService } from './services/todo.service';
import { of } from 'rxjs';

class MockTodoService {
  createTodo() { return of({}); }
  updateTodo() { return of({}); }
}

describe('TodoFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: TodoService, useClass: MockTodoService }],
      imports: [TodoFormComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TodoFormComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });

  it('should call createTodo when saving a new model', () => {
    const fixture = TestBed.createComponent(TodoFormComponent);
    fixture.detectChanges();
  const svc = TestBed.inject(TodoService) as unknown as MockTodoService;
  const spy = jest.spyOn(svc, 'createTodo');
    const comp = fixture.componentInstance;
    comp.model = { title: 'x', description: '', completed: false };
    comp.save();
    expect(spy).toHaveBeenCalled();
  });
});
