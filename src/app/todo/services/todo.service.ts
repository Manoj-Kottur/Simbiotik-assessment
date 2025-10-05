import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, delay } from 'rxjs/operators';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const INITIAL: Todo[] = [
  { id: '1', title: 'Learn Angular', description: 'Read docs', completed: false },
  { id: '2', title: 'Write tests', description: 'Unit tests', completed: false }
];

@Injectable()
export class TodoService {

  enableEditMode: Subject<any> = new Subject();

  private apiUrl = 'https://du-test-api.simbiotiktech.in/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, todo, { headers });
  }

  updateTodo(id: string, todo: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/${id}`, todo, { headers });
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
