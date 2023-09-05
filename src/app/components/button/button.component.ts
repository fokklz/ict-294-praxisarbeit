import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() raised: boolean = false;
  @Input() disabled: boolean = false;
  @Input() rounded: boolean = false;
  @Input() color: 'none' | 'primary' = 'none';

  constructor() {}

  isColor(color: string) {
    return this.color === color;
  }
}
