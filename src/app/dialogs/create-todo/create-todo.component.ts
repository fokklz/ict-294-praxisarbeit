import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoFormComponent } from 'src/app/components/todo-form/todo-form.component';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent {
  @ViewChild('todoForm') todoForm!: TodoFormComponent;

  constructor(
    public dialogRef: MatDialogRef<CreateTodoComponent>,
    private todoService: TodoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTodo() {
    if (this.todoForm && this.todoForm.formGroup.valid) {
      const newTodo = this.todoForm.submit();
      if (newTodo) {
        this.todoService.create(newTodo);
        this.dialogRef.close();
      }
    }
  }
}
