import { Component, OnInit } from '@angular/core';
import { StylingService } from './services/styling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private stylingService: StylingService) {}

  ngOnInit(): void {
    this.stylingService.initialize();
  }
}
