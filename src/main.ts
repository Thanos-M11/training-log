import { initializeApp } from 'firebase/app';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from '../firebaseConfig';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

const app = initializeApp(firebaseConfig);
