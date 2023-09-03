import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { StrapiEntry, StrapiPaginationData } from '../shared/strapi/types';
import { JSONLike, Todo } from '../shared/types';
import { BehaviorSubject } from 'rxjs';
import { ApiTodoService } from '../shared/services/api/api-todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todoSream$: BehaviorSubject<StrapiEntry<Todo>[]> = new BehaviorSubject<
    StrapiEntry<Todo>[]
  >([]);

  private pagination: StrapiPaginationData = {
    page: 1,
    pageSize: 0,
    pageCount: 0,
    total: 0,
  };
  private pageSize = 10;

  todos: { [key: number]: StrapiEntry<Todo>[] } = {};

  constructor(private apiTodoService: ApiTodoService) {
    this.updateData();
  }

  private async updateData() {
    const response = await this.apiTodoService.getAll(this._generate_params());
    if (response && response.meta.pagination) {
      this.pagination = response.meta.pagination;
      this.todos[this.pagination.page] = response.data;
    }
  }

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

  private _generate_params() {
    return {
      'pagination[page]': this.pagination.page,
      'pagination[pageSize]': this.pageSize,
    };
  }

  ngOnDestroy(): void {}
}
