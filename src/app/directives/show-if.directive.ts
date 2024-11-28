import { Breakpoints } from '@angular/cdk/layout';
import {
  Directive,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BreakPointService } from '../services/breakPoint.service';

type BreakPoint = keyof typeof Breakpoints;

@Directive({
  selector: '[appShowIf]',
  standalone: true,
})
export class ShowIfDirective implements OnInit {
  @Input('appShowIf') breakPoints!: BreakPoint[];
  breakpointService = inject(BreakPointService);
  viewContainerRef = inject(ViewContainerRef);
  templateRef = inject(TemplateRef);

  ngOnInit() {
    this.breakpointService
      .observeBreakPoints(this.breakPoints)
      .subscribe((result) => {
        this.viewContainerRef.clear();
        if (result.matches) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }
}
