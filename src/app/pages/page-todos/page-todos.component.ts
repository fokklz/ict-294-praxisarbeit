import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from 'src/app/dialogs/create-todo/create-todo.component';
import { SearchService } from 'src/app/services/search.service';
import { StylingService } from 'src/app/services/styling.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-page-todos',
  templateUrl: './page-todos.component.html',
  styleUrls: ['./page-todos.component.scss'],
})
export class PageTodosComponent {
  constructor(
    public theme: StylingService,
    public todoService: TodoService,
    public dialog: MatDialog
  ) {}

  get pages(): number[] {
    return Object.keys(this.todoService.todos).map((page) => parseInt(page));
  }

  openCreateDialog() {
    this.dialog.open(CreateTodoComponent);
  }
}
