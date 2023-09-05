import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { JSONLike } from '../../types';
import { Observable, firstValueFrom } from 'rxjs';
import {
  StrapiErrorResponse,
  StrapiResponseMany,
  StrapiResponseSingle,
} from '../../strapi/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService<T> {
  private readonly url = environment.api.url;
  private readonly token = environment.api.token;

  protected endpoint = '';

  constructor(private http: HttpClient) {}

  private _check() {
    if (!this.url) {
      throw new Error('No API URL provided');
    }
    if (!this.token) {
      throw new Error('No API token provided');
    }
    if (!this.endpoint) {
      throw new Error('No API endpoint provided');
    }
  }

  private _strapi_headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    };
  }

  private async _handle<Object>(source: Observable<Object>) {
    let data;
    try {
      data = await firstValueFrom(source);
    } catch (e) {
      return Promise.reject(e as StrapiErrorResponse);
    }
    return data;
  }

  protected async get<U>(location: string, params?: JSONLike) {
    return await this._handle(
      this.http.get<U>(`${this.url}/${location}`, {
        params,
        headers: this._strapi_headers(),
      })
    );
  }

  protected async post<U>(location: string, body: T, params?: JSONLike) {
    return await this._handle(
      this.http.post<U>(
        `${this.url}/${location}`,
        {
          data: body,
        },
        {
          params,
          headers: this._strapi_headers(),
        }
      )
    );
  }

  protected async put<U>(
    location: string,
    id: number,
    body: Partial<T>,
    params?: JSONLike
  ) {
    return await this._handle(
      this.http.put<U>(
        `${this.url}/${location}/${id}`,
        {
          data: body,
        },
        {
          params,
          headers: this._strapi_headers(),
        }
      )
    );
  }

  protected async del<U>(location: string, id: number, params?: JSONLike) {
    return await this._handle(
      this.http.delete<U>(`${this.url}/${location}/${id}`, {
        params,
        headers: this._strapi_headers(),
      })
    );
  }

  public getAll(params?: JSONLike) {
    this._check();
    return this.get<StrapiResponseMany<T>>(this.endpoint, params);
  }

  public getOne(id: number, params?: JSONLike) {
    this._check();
    return this.get<StrapiResponseSingle<T>>(`${this.endpoint}/${id}`, params);
  }

  public create(body: T, params?: JSONLike) {
    this._check();
    return this.post<StrapiResponseSingle<T>>(this.endpoint, body, params);
  }

  public delete(id: number, params?: JSONLike) {
    this._check();
    return this.del<number>(this.endpoint, id, params);
  }

  public update(id: number, body: Partial<T>, params?: JSONLike) {
    this._check();
    return this.put<StrapiResponseSingle<T>>(this.endpoint, id, body, params);
  }
}
