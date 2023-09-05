import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
  animations: [
    trigger('chevronState', [
      state(
        'hidden',
        style({
          opacity: 0,
          height: '0px',
          margin: '0px',
          transform: 'scale(0.8)',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          height: '*',
          margin: '*',
          transform: 'scale(1)',
          overflow: 'hidden',
        })
      ),
      transition('hidden <=> visible', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class TimeSelectorComponent {
  @Input() maxLength: number = 2;
  @Input() max: number = 60;
  @Input() value!: number;

  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  get formattedValue(): string {
    if (!this.value) {
      return '00';
    }
    return this.value.toString().padStart(this.maxLength, '0');
  }

  set formattedValue(val: string) {
    let sanitizedValue = this.sanitizeInput(val);

    const temp = parseInt(sanitizedValue, 10);
    if (temp >= 0 && temp < this.max) {
      this.value = temp;
    } else {
      this.value = 0;
    }

    this.input.nativeElement.value = this.formattedValue;
    this.valueChange.emit(this.value);
  }

  /**
   * removes all non-numeric characters from the input
   * and limits the length to the maxLength
   *
   * @param input value to sanitize
   * @returns sanitized value
   */
  private sanitizeInput(input: string): string {
    let sanitized = input.replace(/[^0-9]/g, '');
    if (sanitized.length > this.maxLength) {
      sanitized = sanitized.slice(this.maxLength * -1);
    }
    return sanitized;
  }

  add() {
    if (this.value === null) {
      this.value = 0;
    } else {
      this.value++;
      if (this.value >= this.max) this.value = 0;
    }
    this.valueChange.emit(this.value);
    this.cdr.detectChanges();
  }

  subtract() {
    if (this.value === null) {
      this.value = this.max - 1;
    } else {
      this.value--;
      if (this.value < 0) this.value = this.max - 1;
    }
    this.valueChange.emit(this.value);
    this.cdr.detectChanges();
  }
}
