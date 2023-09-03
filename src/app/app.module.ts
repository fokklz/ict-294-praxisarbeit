import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { PageTodosComponent } from './pages/page-todos/page-todos.component';
import { MaterialModule } from './shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopSearchModule } from './components/top-search/top-search.module';
import { BrandComponent } from './components/brand/brand.component';
import { IconButtonModule } from './components/icon-button/icon-button.module';
import { TodoService } from './services/todo.service';
import { StylingService } from './services/styling.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    PageTodosComponent,
    BrandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TopSearchModule,
    IconButtonModule,
  ],
  providers: [StylingService, TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
