import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { ContentService } from './core/services/content.service';

const routeAnimations = trigger('routeAnimations', [
  transition('home => section', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(32px)' }),
      animate('280ms cubic-bezier(0.25,0.46,0.45,0.94)', style({ opacity: 1, transform: 'none' })),
    ], { optional: true }),
  ]),
  transition('section => home', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-16px)' }),
      animate('240ms cubic-bezier(0.25,0.46,0.45,0.94)', style({ opacity: 1, transform: 'none' })),
    ], { optional: true }),
  ]),
]);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  animations: [routeAnimations],
  template: `
    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet" />
    </div>
  `,
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly content = inject(ContentService);

  ngOnInit(): void {
    this.content.loadAll();
  }

  protected prepareRoute(outlet: RouterOutlet): string | undefined {
    return outlet?.activatedRouteData?.['animation'];
  }
}
