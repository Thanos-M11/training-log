import { Component, inject } from '@angular/core';
import { BreakPointService } from '../services/breakPoint.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  breakPointService = inject(BreakPointService);
  isLargeScreen: boolean = false;

  ngOnInit() {
    this.breakPointService
      .observeBreakPoints(['Large', 'XLarge'])
      .subscribe((result) => {
        if (result.matches) {
          this.isLargeScreen = true;
        } else {
          this.isLargeScreen = false;
        }
      });
  }
}
