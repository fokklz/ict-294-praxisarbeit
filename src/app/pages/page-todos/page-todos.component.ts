import { Component } from '@angular/core';
import { StylingService } from 'src/app/services/styling.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-page-todos',
  templateUrl: './page-todos.component.html',
  styleUrls: ['./page-todos.component.scss'],
})
export class PageTodosComponent {
  constructor(public theme: StylingService, public todoService: TodoService) {}

  get pages(): number[] {
    return Object.keys(this.todoService.todos).map((page) => parseInt(page));
  }
}
