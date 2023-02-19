import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';

import { TodosService } from './services/todos.service';

let todoServiceStub: Partial<TodosService>;

describe('AppComponent', () => {
  beforeEach(async () => {
    todoServiceStub = {};

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [MatSnackBarModule],
      providers: [
        {
          provide: TodosService,
          useValue: todoServiceStub,
        },
        {
          provide: MatSnackBar,
        },
      ],
    }).compileComponents();
  });

  const todos = {
    todos: [
      {
        id: 1,
        todo: 'Do something nice for someone I care about',
        completed: true,
        userId: 26,
      },
      {
        id: 2,
        todo: 'Memorize the fifty states and their capitals',
        completed: false,
        userId: 48,
      },
    ],
  };

  const todoList = {
    completed: [
      {
        id: 1,
        todo: 'Do something nice for someone I care about',
        completed: true,
        userId: 26,
      },
    ],
    pending: [
      {
        id: 2,
        todo: 'Memorize the fifty states and their capitals',
        completed: false,
        userId: 48,
      },
    ],
  };

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('#filterToDo should return object with keys: #completed and #pending', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.filterToDo(todos)).toEqual(todoList);
  });

  it(`#getIndexOfTask should FIND a completed task with the provided id`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.getIndexOfTask('completed', 1, todoList)).toEqual(0);
  });

  it(`#getIndexOfTask should NOT FIND a completed task with the provided id`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.getIndexOfTask('completed', 11, todoList)).toEqual(-1);
  });

  it(`#markAsCompleted should move the provided pending task to completed tasks`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.markAsCompleted(null, todoList.pending[0], todoList);
    expect(todoList.completed.length).toEqual(2);
    expect(todoList.pending.length).toEqual(0);
  });

  it(`#authour should retrun Yemi Orokotan`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.author).toEqual('Yemi Orokotan');
  });
});
