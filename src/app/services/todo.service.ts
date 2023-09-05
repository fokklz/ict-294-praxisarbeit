import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { StrapiEntry, StrapiPaginationData } from '../shared/strapi/types';
import { JSONLike, Todo } from '../shared/types';
import { BehaviorSubject } from 'rxjs';
import { ApiTodoService } from '../shared/services/api/api-todo.service';

const isPastDue = (dueDate: Date) => {
  if (!dueDate) return false;
  const now = new Date();
  const due = new Date(dueDate);
  return due.valueOf() < now.valueOf();
};

const compareDates = (a: Date, b: Date) => {
  const aD = a ? new Date(a) : a;
  const bD = b ? new Date(b) : b;
  return aD.valueOf() - bD.valueOf();
};

const compareTasks = (a: StrapiEntry<Todo>, b: StrapiEntry<Todo>) => {
  const aAttr = a.attributes;
  const bAttr = b.attributes;

  // Rule 1: "Progressing" todos not in the past come first
  const aProgressing = aAttr.progressing && !isPastDue(aAttr.due);
  const bProgressing = bAttr.progressing && !isPastDue(bAttr.due);

  if (aProgressing && !bProgressing) return -1;
  if (bProgressing && !aProgressing) return 1;

  // Sub-rule for closest due date inside progressing
  if (aProgressing && bProgressing && aAttr.due && bAttr.due) {
    return compareDates(aAttr.due, bAttr.due);
    // ensure closest due will climb whil not in the past
  } else if (aAttr.due && !isPastDue(aAttr.due)) {
    return -1;
  }

  // Rule 2: "Not progressing" todos with a due date come second
  const aNotProgressingDue =
    !aAttr.progressing && aAttr.due && !isPastDue(aAttr.due);
  const bNotProgressingDue =
    !bAttr.progressing && bAttr.due && !isPastDue(bAttr.due);

  if (aNotProgressingDue && !bNotProgressingDue) return -1;
  if (bNotProgressingDue && !aNotProgressingDue) return 1;

  // Sub-rule for closest due date within "not progressing" todos
  if (aNotProgressingDue && bNotProgressingDue) {
    return compareDates(aAttr.due, bAttr.due);
  }

  // Rule 3: Todos that are not finished come third
  if (aAttr.finished === null && bAttr.finished !== null) return -1;
  if (bAttr.finished === null && aAttr.finished !== null) return 1;

  // Rule 4: Todos with a due date in the past come last
  if (isPastDue(aAttr.due) && !isPastDue(bAttr.due)) return 1;
  if (isPastDue(bAttr.due) && !isPastDue(aAttr.due)) return -1;

  return 0;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  hasBackend$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private pagination: StrapiPaginationData = {
    page: 1,
    pageSize: 0,
    pageCount: 0,
    total: 0,
  };
  private pageSize = 100;

  todos: { [id: number]: StrapiEntry<Todo>['attributes'] } = {};
  private unsorted: StrapiEntry<Todo>[] = [];
  todos$: BehaviorSubject<StrapiEntry<Todo>[]> = new BehaviorSubject<
    StrapiEntry<Todo>[]
  >([]);

  constructor(private apiTodoService: ApiTodoService) {
    this.updateData();
    this.hasBackend$.subscribe((hasBackend) => {
      if (!hasBackend) {
        setTimeout(() => {
          this.updateData();
        }, 5000);
      }
    });
  }

  private _generate_params() {
    return {
      'pagination[page]': this.pagination.page,
      'pagination[pageSize]': this.pageSize,
    };
  }

  private resetStroage() {
    this.todos = {};
    this.pagination = {
      page: 1,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    };
  }

  private async updateData() {
    let response;
    let statusZero = false;
    try {
      response = await this.apiTodoService.getAll(this._generate_params());
    } catch (error: any) {
      if (error.status === 0) {
        statusZero = true;
      }
    }

    if (statusZero) {
      this.hasBackend$.next(false);
    } else {
      this.hasBackend$.next(true);
    }

    if (response && response.meta.pagination) {
      this.pagination = response.meta.pagination;
      response.data.forEach((todo) => {
        this.todos[todo.id] = todo.attributes;
      });

      this.unsorted = Object.entries(this.todos).map(([id, attributes]) => {
        return {
          id: parseInt(id, 10),
          attributes,
        } as StrapiEntry<Todo>;
      });
      this.sort();
    }
  }

  sort() {
    this.todos$.next([...this.unsorted].sort(compareTasks));
  }

  async delete(id: number) {
    await this.apiTodoService.delete(id);
    delete this.todos[id];
    this.sort();
  }

  async update(id: number, body: Partial<Todo>) {
    const newTodo = await this.apiTodoService.update(id, body);

    // update the todo in the storage
    this.todos[id] = {
      ...this.todos[id],
      ...newTodo.data.attributes,
    };

    this.unsorted = this.unsorted.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          attributes: {
            ...todo.attributes,
            ...newTodo.data.attributes,
          },
        };
      }
      return todo;
    });
    this.sort();
  }

  async create(body: Pick<Todo, 'title' | 'description' | 'due'>) {
    const newTodo = await this.apiTodoService.create(body as Todo);
    this.todos[newTodo.data.id] = newTodo.data.attributes;
    this.unsorted.push(newTodo.data);
    this.sort();
  }

  /*
  prevPage() {
    if (this.pagination.page > 1) {
      this.pagination.page--;
      this.updateData();
    }
  }

  nextPage() {
    if (this.pagination.page < this.pagination.pageCount) {
      this.pagination.page++;
      this.updateData();
    }
  }


  async create(body: Todo) {
    const newTodo = await this.apiTodoService.create(body);
    this.resetStroage();
    this.updateData();
  }

  async delete(id: number) {
    await this.apiTodoService.delete(id);
    this.resetStroage();
    this.updateData();
  }

  async update(id: number, body: Todo) {
    const page = this.findPage(id);
    if (page) {
      const newTodo = await this.apiTodoService.update(id, body);
      this.todos[page] = this.todos[page].map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            attributes: {
              ...todo.attributes,
              ...newTodo.data.attributes,
            },
          };
        }
        return todo;
      });
    }
  }*/

  ngOnDestroy(): void {}
}
