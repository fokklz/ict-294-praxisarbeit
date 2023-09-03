import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StylingService {
  private renderer: Renderer2;
  darkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.darkMode$.subscribe((darkMode) => {
      if (darkMode) {
        this.renderer.addClass(document.body, 'dark');
      } else {
        this.renderer.removeClass(document.body, 'dark');
      }
    });
  }

  enableDarkMode() {
    this.darkMode$.next(true);
    localStorage.setItem('theme', 'dark');
  }

  disableDarkMode() {
    this.darkMode$.next(false);
    localStorage.setItem('theme', 'light');
  }

  toggleTheme() {
    if (this.darkMode$.value) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  initialize() {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.darkMode$.next(true);
    }
  }
}
