import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, query, style, transition, trigger } from '@angular/animations';
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

    @if (!online()) {
      <div class="offline-banner" role="status" aria-live="polite">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="1" y1="1" x2="23" y2="23"/>
          <path d="M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71
                   5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95
                   0M12 20h.01"/>
        </svg>
        You are offline — showing cached content.
      </div>
    }
  `,
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private readonly content = inject(ContentService);

  protected readonly online = signal(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  private readonly onOnline = (): void => this.online.set(true);
  private readonly onOffline = (): void => this.online.set(false);

  ngOnInit(): void {
    this.content.loadAll();
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);
  }

  ngOnDestroy(): void {
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
  }

  protected prepareRoute(outlet: RouterOutlet): string | undefined {
    return outlet?.activatedRouteData?.['animation'];
  }
}
