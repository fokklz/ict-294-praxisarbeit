import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Todo } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiTodoService extends ApiService<Todo> {
  constructor(http: HttpClient) {
    super(http);
    this.endpoint = 'todos';
  }
}
