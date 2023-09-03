import { Component, Inject, OnInit } from '@angular/core';
import { StylingService } from './services/styling.service';
import { TodoService } from './services/todo.service';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  noBackendOverlay = false;

  constructor(
    private stylingService: StylingService,
    private todoService: TodoService
  ) //@Inject(APP_BASE_HREF) private baseHref: string
  {}

  /*img(src: string) {
    return `${this.baseHref}${src}`;
  }*/

  ngOnInit(): void {
    this.stylingService.initialize();

    this.todoService.hasBackend$.subscribe((hasBackend) => {
      if (!hasBackend) {
        this.noBackendOverlay = true;
      } else {
        this.noBackendOverlay = false;
      }
    });
  }

  detected(isDetected: boolean) {
    if (isDetected) {
      this.todoService.hasBackend$.next(false);
    }
  }
}
