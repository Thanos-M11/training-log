import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './stop-training.component.html',
  styleUrl: './stop-training.component.scss',
})
export class StopTrainingComponent {
  dialogData = inject(MAT_DIALOG_DATA);
}
