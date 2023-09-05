import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TodoFormComponent } from './todo-form.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimeSelectorComponent } from './time-picker/time-selector/time-selector.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [TodoFormComponent, TimePickerComponent, TimeSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [MatDatepickerModule],
  exports: [TodoFormComponent],
})
export class TodoFormModule {}
