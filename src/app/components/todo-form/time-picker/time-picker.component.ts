import { Component, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Time } from './types';
import { TimeSelectorComponent } from './time-selector/time-selector.component';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
})
export class TimePickerComponent implements ControlValueAccessor {
  private _time: Time = { hours: 0, minutes: 0 };

  // Form control callbacks
  private onChange: any = () => {};
  private onTouched: any = () => {};

  get time(): Time {
    return this._time;
  }

  set time(value: Time) {
    if (value !== this._time) {
      this._time = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  get currentHours(): number {
    return this._time.hours;
  }

  get currentMinutes(): number {
    return this._time.minutes;
  }

  writeValue(value: Time): void {
    this._time = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setHours(hours: number) {
    this.time = { ...this.time, hours };
  }

  setMinutes(minutes: number) {
    this.time = { ...this.time, minutes };
  }
}
