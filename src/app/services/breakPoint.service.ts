import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

type BreakPoint = keyof typeof Breakpoints;

@Injectable({ providedIn: 'root' })
export class BreakPointService {
  breakPointObserver = inject(BreakpointObserver);
  destroyRef = inject(DestroyRef);

  observeBreakPoints(breakPoints: BreakPoint[]): Observable<BreakpointState> {
    const queries = breakPoints.map((bp) => Breakpoints[bp]);
    return this.breakPointObserver
      .observe(queries)
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
