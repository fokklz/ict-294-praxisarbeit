import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.scss'],
  animations: [
    trigger('slideInAnimation', [
      state(
        'out',
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        })
      ),
      state(
        'in',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('out => in', [animate('300ms ease-out')]),
      transition('in => out', [animate('300ms ease-in')]),
    ]),
  ],
})
export class TopSearchComponent {
  focused = false;
  shadowFocus = false;
  dirty = false;
  debounceTimeout: any;

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('inputWrapper') inputWrapper!: ElementRef<HTMLDivElement>;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.dirty = this.input.nativeElement.value.length > 0;
  }

  onChanges() {
    this.dirty = true;
    if (this.input.nativeElement.value.length <= 0) {
      this.dirty = false;
    }
    this.do();
  }

  do(e?: Event) {
    if (e) e.stopPropagation();
    this.search.emit(this.input.nativeElement.value);
  }

  focusInput(e: Event) {
    if (this.focused) {
      e.stopPropagation();
      return;
    }
    this.input.nativeElement.focus();
  }
}
