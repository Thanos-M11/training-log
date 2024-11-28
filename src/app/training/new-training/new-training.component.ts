import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit {
  trainingService = inject(TrainingService);
  exercises: Exercise[] = [];

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
