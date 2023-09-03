import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-terminal-commands',
  templateUrl: './terminal-commands.component.html',
  styleUrls: ['./terminal-commands.component.scss'],
})
export class TerminalCommandsComponent {
  @Input() commands: string[] = [];

  constructor(private snackBar: MatSnackBar) {}

  copyToClipboard() {
    const commandsStr = this.commands.join('\n');

    navigator.clipboard
      .writeText(commandsStr)
      .then(() => {
        this.snackBar.open('In die Zwischenablage Kopiert!', 'Schliessen', {
          duration: 2000,
        });
      })
      .catch((err) => {
        this.snackBar.open(
          'Fehler beim Kopieren, Versuch es manuel!',
          'Schliessen',
          {
            duration: 2000,
          }
        );
      });
  }
}
