import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  exerciseChangedSubject = new Subject<Exercise | null>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    const selectedExercise = this.availableExercises.find(
      (exercise) => exercise.id === exerciseId
    );
    if (selectedExercise) {
      this.runningExercise = selectedExercise;
      this.exerciseChangedSubject.next(selectedExercise);
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed',
      });
    }
    this.runningExercise = null;
    this.exerciseChangedSubject.next(null);
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.exercises.push({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
    }
    this.runningExercise = null;
    this.exerciseChangedSubject.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getExercises() {
    return [...this.exercises];
  }
}
