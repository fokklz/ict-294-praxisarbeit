import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { IconButtonComponent } from './icon-button/icon-button.component';
import { TerminalCommandsComponent } from './terminal-commands/terminal-commands.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TimePickerComponent } from './todo-form/time-picker/time-picker.component';
import { TimeSelectorComponent } from './todo-form/time-picker/time-selector/time-selector.component';
import { TopSearchComponent } from './top-search/top-search.component';

@NgModule({
  declarations: [
    TerminalCommandsComponent,
    IconButtonComponent,
    TodoFormComponent,
    TimePickerComponent,
    TimeSelectorComponent,
    TopSearchComponent,
  ],
  exports: [
    TerminalCommandsComponent,
    IconButtonComponent,
    TodoFormComponent,
    TopSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [MatDatepickerModule],
})
export class ComponentsModule {}
