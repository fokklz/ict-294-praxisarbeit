import { Component, OnInit } from '@angular/core';
import { StylingService } from './services/styling.service';
import { TodoService } from './services/todo.service';

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
  ) {}

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
