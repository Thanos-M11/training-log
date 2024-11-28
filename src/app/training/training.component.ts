import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingService } from '../services/training.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    MatTabsModule,
    NewTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent implements OnInit {
  trainingService = inject(TrainingService);
  destroyRef = inject(DestroyRef);

  ongoingTraining = false;

  ngOnInit() {
    this.trainingService.exerciseChangedSubject
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((exercise) => (this.ongoingTraining = exercise !== null));
  }
}
