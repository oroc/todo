import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITodo, ITodos } from './interfaces/todo';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  author = 'Yemi Orokotan';
  todoList: any = {};
  title = 'todo';

  constructor(private todos: TodosService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.todos.getTodos().subscribe((result: ITodos) => {
      this.todoList = this.filterToDo(result);
    });
  }

  filterToDo(data: ITodos) {
    const completed: ITodo[] = [];
    const pending: ITodo[] = [];

    data.todos.forEach((element: ITodo) => {
      if (element.completed) completed.push(element);
      else pending.push(element);
    });

    return { completed, pending };
  }

  markAsCompleted(event: any, item: ITodo) {
    const thisTaskStatus = this.getIndexOfTask('completed', item.id);

    const isPending = thisTaskStatus === -1;

    if (isPending) {
      this.todoList['completed'].push(item);

      const completedItemIndex = this.getIndexOfTask('pending', item.id);

      // setTimeout(() => {
      this.todoList['pending'].splice(completedItemIndex, 1);
      this.showSnackBar('Task Completed');
      // }, 1000);
    }
  }

  unMarkAsCompleted(event: any) {
    console.log(event);
    const taskItemIndex = this.getIndexOfTask(
      'completed',
      event.source.value.id
    );

    this.todoList['completed'].splice(taskItemIndex, 1);
    this.todoList['pending'].push(event.source.value);
    this.showSnackBar('Task Undone');
  }

  getIndexOfTask(taskStatusType: string, id: number) {
    return this.todoList[taskStatusType].findIndex((element: ITodo) => {
      return element.id === id;
    });
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
