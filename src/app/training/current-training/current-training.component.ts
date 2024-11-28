import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatDialogModule],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.scss',
})
export class CurrentTrainingComponent implements OnInit {
  trainingService = inject(TrainingService);
  progress = 0;
  timer!: number;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.startResumeTimer();
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
        runningExercise: this.trainingService.getRunningExercise(),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startResumeTimer();
      }
    });
  }

  private startResumeTimer() {
    const step =
      ((this.trainingService.getRunningExercise() as Exercise).duration / 100) *
      1000;

    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
}
