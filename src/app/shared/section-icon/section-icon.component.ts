import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-icon',
  template: `
    <svg
      width="18" height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (slug()) {
        @case ('emergencies') {
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
        }
        @case ('healthcare') {
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
        }
        @case ('university') {
          <path d="M22 10L12 5 2 10l10 5 10-5z"/>
          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
        }
        @case ('everyday') {
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        }
        @case ('banking') {
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
        }
        @case ('food') {
          <path d="M3 2v7c0 1.1.9 2 2 2h2v11M21 2v20M16 11h5"/>
          <path d="M7 2v9"/>
        }
        @case ('accommodation') {
          <path d="M3 12l9-9 9 9M5 10v10h14V10"/>
        }
        @case ('arrival') {
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
        }
        @case ('transport') {
          <rect x="4" y="3" width="16" height="16" rx="2"/>
          <path d="M4 13h16M8 19v2M16 19v2"/>
          <circle cx="8.5" cy="16" r="1"/>
          <circle cx="15.5" cy="16" r="1"/>
        }
      }
    </svg>
  `,
})
export class SectionIconComponent {
  readonly slug = input.required<string>();
}
