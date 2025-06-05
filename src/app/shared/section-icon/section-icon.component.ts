import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-icon',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="sw()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (slug()) {
        @case ('emergencies') {
          <path d="M12 3 2.5 20h19L12 3Z"/>
          <path d="M12 9.5v4.5"/>
          <path d="M12 17.5h.01"/>
        }
        @case ('healthcare') {
          <path d="M12 5v14"/>
          <path d="M5 12h14"/>
        }
        @case ('university') {
          <path d="M3 10 12 4l9 6"/>
          <path d="M5 10.5v8.5"/>
          <path d="M19 10.5v8.5"/>
          <path d="M9.5 10.5v8.5"/>
          <path d="M14.5 10.5v8.5"/>
          <path d="M3.5 20h17"/>
        }
        @case ('everyday') {
          <path d="M5 5h14a1.2 1.2 0 0 1 1.2 1.2v7.6A1.2 1.2 0 0 1 19 15H9.5L5.5 18.5V6.2A1.2 1.2 0 0 1 6.7 5Z"/>
          <path d="M9 10h6"/>
        }
        @case ('banking') {
          <rect x="3" y="6" width="18" height="12" rx="2.4"/>
          <path d="M3 10h18"/>
          <path d="M6.5 14.5h3"/>
        }
        @case ('food') {
          <path d="M7 3v18"/>
          <path d="M5 3v4a2 2 0 0 0 4 0V3"/>
          <path d="M16 3v18"/>
          <path d="M16 3c2.2 0 3.4 2 3.4 5S18 13 16 13"/>
        }
        @case ('accommodation') {
          <path d="M4 11 12 4l8 7"/>
          <path d="M6 9.8V20h12V9.8"/>
          <path d="M10 20v-5h4v5"/>
        }
        @case ('arrival') {
          <path d="M21 4 11 14"/>
          <path d="M21 4l-7 17-3.5-7.5L3 10 21 4Z"/>
        }
        @case ('transport') {
          <rect x="4" y="4.5" width="16" height="11.5" rx="2.4"/>
          <path d="M4 11h16"/>
          <circle cx="8" cy="18.5" r="1.4"/>
          <circle cx="16" cy="18.5" r="1.4"/>
        }
      }
    </svg>
  `,
})
export class SectionIconComponent {
  readonly slug = input.required<string>();
  readonly size = input<number>(24);
  readonly sw = input<number>(2);
}
