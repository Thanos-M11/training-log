import { BehaviorSubject } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthData } from '../models/auth-data.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: User | null = null;
  private router = inject(Router);
  private authChangeSubject = new BehaviorSubject<boolean>(false);
  authChange$ = this.authChangeSubject.asObservable();

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccess();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccess();
  }

  logout() {
    this.user = null;
    this.authChangeSubject.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user !== null;
  }

  private authSuccess() {
    this.authChangeSubject.next(true);
    this.router.navigate(['/training']);
  }
}
