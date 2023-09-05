import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StrapiEntry } from 'src/app/shared/strapi/types';
import { Todo } from 'src/app/shared/types';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { TodoFormComponent } from 'src/app/components/todo-form/todo-form.component';
import { TodoService } from 'src/app/services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('slideVertical', [
      state(
        'void',
        style({
          height: '0px',
          minHeight: '0',
          visibility: 'hidden',
          overflow: 'hidden',
        })
      ),
      state(
        '*',
        style({ height: '*', visibility: 'visible', overflow: 'hidden' })
      ),
      transition('* <=> void', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class TodoComponent implements OnDestroy, OnInit {
  timeout: any;
  lowestTimeUnit: 'days' | 'hours' | 'minutes' | 'seconds' = 'days';
  isTimeUp = false;
  timeLeft = '';
  hasFormChanged = false;

  editing = false;
  // fix disappearing before animation
  editingEcho = false;

  @ViewChild('todoForm') todoForm!: TodoFormComponent;

  @Input() data!: StrapiEntry<Todo>;

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateTimeLeft();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  // Data Helpers
  get title(): string {
    return this.data?.attributes.title ?? '';
  }

  get description(): string {
    return this.data?.attributes.description ?? '';
  }

  get due(): Date | null {
    if (!this.data?.attributes.due) {
      return null;
    }
    return new Date(this.data.attributes.due);
  }

  get hasDue(): boolean {
    return this.due != null;
  }

  get hasDescription(): boolean {
    return this.description.length > 0;
  }

  set progressControl(value: boolean) {
    this.data.attributes.progressing = value;
    this.todoService.update(this.data.id, { progressing: value });
  }

  get progressControl(): boolean {
    return this.data.attributes.progressing;
  }

  get timeClass(): string {
    return this.isTimeUp ? 'opacity-30 pointer-events-none' : '';
  }

  get hasFormChanges(): boolean {
    if (!this.todoForm) return false;
    return this.todoForm.hasFormChanged;
  }

  deleteTodo() {
    this.dialog.open(ConfirmDeleteComponent, {
      data: { id: this.data.id },
    });
  }

  toggleEditing() {
    if (this.editing) {
      this.disableEditing();
    } else {
      this.enableEditing();
    }
  }

  enableEditing() {
    this.editing = true;
    this.editingEcho = true;
  }

  disableEditing() {
    this.editing = false;
    setTimeout(() => {
      this.editingEcho = false;
      this.cdr.detectChanges();
    }, 400);
  }

  save() {
    if (this.todoForm.formGroup.valid) {
      const data = this.todoForm.submit();
      if (data === null) return;

      this.disableEditing();
      this.todoService.update(this.data.id, data);
    }
  }

  /**
   * Will update the time left based on the lowest time unit
   * to reduce load
   *
   * will call itself recursively until the component is destroyed
   */
  updateTimeLeft() {
    this.calculateTimeLeft();
    let wait = 0;
    switch (this.lowestTimeUnit) {
      case 'days':
        wait = 1000 * 60 * 60 * 24;
        break;
      case 'hours':
        wait = 1000 * 60 * 60;
        break;
      case 'minutes':
        wait = 1000 * 60;
        break;
      default:
        wait = 1000;
        break;
    }
    this.timeout = setTimeout(() => {
      this.updateTimeLeft();
    }, wait);
  }

  /**
   * will display the time left until the due date (or passed)
   *
   * @returns time from now in a human readable format (not exact)
   */
  calculateTimeLeft() {
    if (!this.due) return;

    const now = new Date();

    // Calculate time left
    let diffInMilliseconds = Math.abs(this.due.getTime() - now.getTime());
    // Change wording when date is in the past
    const timePrefix =
      this.due.getTime() > now.getTime() ? 'verbleibend' : 'verstrichen';

    this.isTimeUp = this.due.getTime() <= now.getTime();

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    if (days > 0) {
      this.timeLeft = `${days} Tage ${timePrefix}`;
      this.lowestTimeUnit = 'days';
      return;
    }

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    if (hours > 0) {
      this.timeLeft = `${hours} Stunden ${timePrefix}`;
      this.lowestTimeUnit = 'hours';
      return;
    }

    const minutes = Math.floor(diffInMilliseconds / (1000 * 60));
    if (minutes > 0) {
      this.timeLeft = `${minutes} Minuten ${timePrefix}`;
      this.lowestTimeUnit = 'minutes';
      return;
    }

    const seconds = Math.floor(diffInMilliseconds / 1000);
    this.lowestTimeUnit = 'seconds';
    this.timeLeft = `${seconds} Sekunden ${timePrefix}`;
  }
}
