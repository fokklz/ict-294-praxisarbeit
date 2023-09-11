import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateTodoComponent } from 'src/app/dialogs/create-todo/create-todo.component';
import { StylingService } from 'src/app/services/styling.service';
import { TodoService } from 'src/app/services/todo.service';
import { StrapiEntry } from 'src/app/shared/strapi/types';
import { Todo } from 'src/app/shared/types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-todos',
  templateUrl: './page-todos.component.html',
  styleUrls: ['./page-todos.component.scss'],
})
export class PageTodosComponent implements OnInit {
  search: string = '';

  filteredTodo$: BehaviorSubject<StrapiEntry<Todo>[] | undefined> =
    new BehaviorSubject<StrapiEntry<Todo>[] | undefined>(undefined);

  constructor(
    public theme: StylingService,
    public todoService: TodoService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  updateSearch(search: string) {
    this.search = search;
  }

  get todos(): Observable<StrapiEntry<Todo>[]> {
    return this.todoService.todos$
      .asObservable()
      .pipe(
        map((todos) =>
          todos
            ? todos.filter(
                (todo) =>
                  !this.search ||
                  todo.attributes.title
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
              )
            : []
        )
      );
  }

  get pages(): number[] {
    return Object.keys(this.todoService.todos).map((page) => parseInt(page));
  }

  openCreateDialog() {
    this.dialog.open(CreateTodoComponent);
  }
}
