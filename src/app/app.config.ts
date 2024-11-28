import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
  ],
};

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyA8FhBRQRXLBJaY8ZAuola0Rz-Sz2tMbC0',
//   authDomain: 'fitness-tracker-demo-87a3e.firebaseapp.com',
//   projectId: 'fitness-tracker-demo-87a3e',
//   storageBucket: 'fitness-tracker-demo-87a3e.firebasestorage.app',
//   messagingSenderId: '252768295357',
//   appId: '1:252768295357:web:e4dd68e903a76476ca5ad4',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
