import { Time } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { StrapiEntry } from 'src/app/shared/strapi/types';
import { Todo } from 'src/app/shared/types';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnChanges, OnInit {
  formGroup: FormGroup;

  hasFormChanged = false;

  @ViewChild('calendar') calendar!: MatCalendar<any>;

  @Input() initialData?: StrapiEntry<Todo>;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      due: [''],
      time: [
        {
          hours: 0,
          minutes: 0,
        },
      ],
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.hasFormChanged = this._hasChanged();
    });
  }

  _parseData(data: any) {
    if (!data) return;

    if (data.attributes.due) {
      data.attributes.due = new Date(data.attributes.due);
    }
    return data;
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.initialData && this.initialData.attributes.due) {
        const date = new Date(this.initialData.attributes.due);
        this.calendar._goToDateInView(date, 'month');
      }
    }, 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && changes['initialData'].firstChange) {
      this.initialData = this._parseData(this.initialData);
      this.formGroup.patchValue({
        title: this.initialData?.attributes.title,
        description: this.initialData?.attributes.description,
        due: this.initialData?.attributes.due,
        time: this._getTime(this.initialData?.attributes.due),
      });
      this.cdr.detectChanges();
    }
  }

  /**
   * factory to update the date with the time
   *
   * @param date Date to modify
   * @param time time to apply
   * @returns modified date
   */
  private _dateFactory(date: Date | string, time?: Time): Date {
    const workingDate = typeof date == 'string' ? new Date(date) : date;
    const workingTime = (time || this.formGroup.get('time')?.value) ?? {
      hours: 0,
      minutes: 0,
    };

    const { hours, minutes } = workingTime;

    const factory = workingDate;
    factory.setHours(hours);
    factory.setMinutes(minutes);
    return factory;
  }

  private rDate(value: Date | string) {
    if (typeof value == 'string') return new Date(value);
    return value;
  }

  private _getTime(date?: Date): Time {
    if (!date) return { hours: 0, minutes: 0 };
    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };
  }

  private _hasChanged(): boolean {
    if (!this.initialData) return false;

    const sanitize = (value: any) => {
      if (value.title === '') return null;
      const date = this.rDate(value.due);
      return {
        title: value.title,
        description: value.description,
        due: date == null ? null : date.getTime(),
        time: `${value.time.hours}${value.time.minutes}`,
      };
    };

    const ob1 = sanitize(this.formGroup.value);
    const ob2 = sanitize({
      title: this.initialData.attributes.title,
      description: this.initialData.attributes.description,
      due: this.initialData.attributes.due,
      time: this._getTime(this.initialData.attributes.due),
    });
    if (!ob1 || !ob2) return false;
    return (
      ob1.title !== ob2.title ||
      ob1.description !== ob2.description ||
      ob1.due !== ob2.due ||
      ob1.time !== ob2.time
    );
  }

  get modifyDate(): Date {
    return this.formGroup.get('due')?.value;
  }

  set modifyDate(value: string) {
    this.formGroup.get('due')?.setValue(this._dateFactory(value));
  }

  submit() {
    if (this.formGroup.invalid) return null;
    const { title, description, due } = this.formGroup.value;
    const time = this.formGroup.get('time')?.value;
    const date = this._dateFactory(due, time);
    return {
      title,
      description,
      due: date,
    };
  }

  today() {
    return new Date();
  }
}
