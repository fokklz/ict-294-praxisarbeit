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

  protected async post<U>(location: string, body: JSONLike, params?: JSONLike) {
    return await this._handle(
      this.http.post<U>(`${this.url}/${location}`, body, {
        params,
        headers: this._strapi_headers(),
      })
    );
  }

  public getAll(params?: JSONLike) {
    this._check();
    return this.get<StrapiResponseMany<T>>(this.endpoint, params);
  }

  public getOne(id: string, params?: JSONLike) {
    this._check();
    return this.get<StrapiResponseSingle<T>>(`${this.endpoint}/${id}`, params);
  }

  public create(body: JSONLike, params?: JSONLike) {
    this._check();
    return this.post<StrapiResponseSingle<T>>(this.endpoint, body, params);
  }
}
