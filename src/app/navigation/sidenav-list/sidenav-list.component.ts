import { RouterLink } from '@angular/router';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [RouterLink, MatListModule, MatIconModule],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  isAuth = false;
  @Output() closeSidenav = new EventEmitter<void>();

  ngOnInit() {
    this.authService.authChange$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((authStatus) => (this.isAuth = authStatus));
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
