import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private todoService: TodoService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteTodo() {
    console.log('deleteTodo');
    this.todoService.delete(this.data.id);
    this.dialogRef.close();
  }
}
