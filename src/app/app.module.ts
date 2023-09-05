import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgAdblockDetectModule } from 'ng-adblock-detect2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { PageTodosComponent } from './pages/page-todos/page-todos.component';
import { MaterialModule } from './shared/modules/material.module';
import { TopSearchModule } from './components/top-search/top-search.module';
import { BrandComponent } from './components/brand/brand.component';
import { IconButtonModule } from './components/icon-button/icon-button.module';
import { TodoService } from './services/todo.service';
import { StylingService } from './services/styling.service';
import { TerminalCommandsComponent } from './components/terminal-commands/terminal-commands.component';
import { TodoComponent } from './pages/page-todos/todo/todo.component';

import { ComponentsModule } from './components/components.module';
import { TodoFormModule } from './components/todo-form/todo-form.module';
import { SearchService } from './services/search.service';
import { CreateTodoComponent } from './dialogs/create-todo/create-todo.component';
import { ConfirmDeleteComponent } from './dialogs/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    PageTodosComponent,
    BrandComponent,
    TerminalCommandsComponent,
    TodoComponent,
    CreateTodoComponent,
    ConfirmDeleteComponent,
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
    NgAdblockDetectModule,
    ComponentsModule,
    TodoFormModule,
  ],
  providers: [
    StylingService,
    TodoService,
    SearchService,
    { provide: LOCALE_ID, useValue: 'de' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
