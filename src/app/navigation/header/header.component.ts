import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShowIfDirective } from '../../directives/show-if.directive';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ShowIfDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  authService = inject(AuthService);
  destroyRef = inject(DestroyRef);
  isAuth = false;

  ngOnInit() {
    this.authService.authChange$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((authStatus) => (this.isAuth = authStatus));
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
